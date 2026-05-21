const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    const existingRegistration = await Registration.findOne({ user: req.user._id, event: eventId });
    if (existingRegistration) {
      if (existingRegistration.status === 'confirmed') {
        return res.status(400).json({ message: 'Already registered for this event' });
      } else {
        if (event.capacity <= 0) return res.status(400).json({ message: 'Event is at full capacity' });
        
        existingRegistration.status = 'confirmed';
        const updatedReg = await existingRegistration.save();
        
        event.capacity -= 1;
        await event.save();
        
        return res.status(200).json(updatedReg);
      }
    }
    
    if (event.capacity <= 0) return res.status(400).json({ message: 'Event is at full capacity' });

    const registration = new Registration({ user: req.user._id, event: eventId });
    const createdRegistration = await registration.save();

    event.capacity -= 1;
    await event.save();
    
    res.status(201).json(createdRegistration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id }).populate('event');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });

    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (registration.status !== 'cancelled') {
      registration.status = 'cancelled';
      await registration.save();

      const event = await Event.findById(registration.event);
      if (event) {
        event.capacity += 1;
        await event.save();
      }
    }

    res.json({ message: 'Registration cancelled', registration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventRegistrations = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const registrations = await Registration.find({ event: eventId }).populate('user', 'name email');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
