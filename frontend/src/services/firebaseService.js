import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection names
const COLLECTIONS = {
  EVENTS: 'events',
  CLUBS: 'clubs',
  NEWS: 'news',
  USERS: 'users'
};

// Events Service
export const eventsService = {
  // Create a new event
  async createEvent(eventData) {
    try {
      console.log('Creating event in Firestore:', eventData);
      const docRef = await addDoc(collection(db, COLLECTIONS.EVENTS), {
        ...eventData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        attendees: []
      });
      console.log('Event created with ID:', docRef.id);
      return { id: docRef.id, ...eventData };
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Get all events
  async getAllEvents() {
    try {
      console.log('Fetching events from Firestore...');
      const q = query(collection(db, COLLECTIONS.EVENTS), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, _id: doc.id, ...doc.data() });
      });
      console.log('Fetched events:', events);
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Update an event
  async updateEvent(eventId, updateData) {
    try {
      const eventRef = doc(db, COLLECTIONS.EVENTS, eventId);
      await updateDoc(eventRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id: eventId, ...updateData };
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  // Delete an event
  async deleteEvent(eventId) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.EVENTS, eventId));
      console.log('Event deleted:', eventId);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Add RSVP to event
  async rsvpToEvent(eventId, userId) {
    try {
      const eventRef = doc(db, COLLECTIONS.EVENTS, eventId);
      // Note: This is simplified - in a real app, you'd need to handle array operations properly
      await updateDoc(eventRef, {
        [`attendees.${userId}`]: {
          userId,
          rsvpAt: serverTimestamp()
        },
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error RSVPing to event:', error);
      throw error;
    }
  }
};

// Users Service
export const usersService = {
  // Create or update user profile
  async updateUserProfile(userId, profileData) {
    try {
      const userRef = doc(db, COLLECTIONS.USERS, userId);
      await updateDoc(userRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      });
      return { id: userId, ...profileData };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Get user profile
  async getUserProfile(userId) {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};

// Clubs Service
export const clubsService = {
  // Get all clubs
  async getAllClubs() {
    try {
      console.log('Fetching clubs from Firestore...');
      const q = query(collection(db, COLLECTIONS.CLUBS), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const clubs = [];
      querySnapshot.forEach((doc) => {
        clubs.push({ id: doc.id, _id: doc.id, ...doc.data() });
      });
      console.log('Fetched clubs:', clubs);
      return clubs;
    } catch (error) {
      console.error('Error fetching clubs:', error);
      throw error;
    }
  },

  // Create a new club
  async createClub(clubData) {
    try {
      console.log('Creating club in Firestore:', clubData);
      const docRef = await addDoc(collection(db, COLLECTIONS.CLUBS), {
        ...clubData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        members: []
      });
      console.log('Club created with ID:', docRef.id);
      return { id: docRef.id, _id: docRef.id, ...clubData };
    } catch (error) {
      console.error('Error creating club:', error);
      throw error;
    }
  },

  // Join a club
  async joinClub(clubId, userId, userDisplayName) {
    try {
      const clubRef = doc(db, COLLECTIONS.CLUBS, clubId);
      const clubDoc = await getDoc(clubRef);
      
      if (clubDoc.exists()) {
        const clubData = clubDoc.data();
        const currentMembers = clubData.members || [];
        
        // Check if user is already a member
        const isAlreadyMember = currentMembers.some(member => member.userId === userId);
        if (isAlreadyMember) {
          throw new Error('User is already a member of this club');
        }
        
        // Add new member
        const newMember = {
          userId,
          displayName: userDisplayName,
          joinedAt: serverTimestamp()
        };
        
        const updatedMembers = [...currentMembers, newMember];
        
        await updateDoc(clubRef, {
          members: updatedMembers,
          updatedAt: serverTimestamp()
        });
        
        console.log('User joined club successfully');
        return { ...clubData, members: updatedMembers };
      } else {
        throw new Error('Club not found');
      }
    } catch (error) {
      console.error('Error joining club:', error);
      throw error;
    }
  },

  // Leave a club
  async leaveClub(clubId, userId) {
    try {
      const clubRef = doc(db, COLLECTIONS.CLUBS, clubId);
      const clubDoc = await getDoc(clubRef);
      
      if (clubDoc.exists()) {
        const clubData = clubDoc.data();
        const currentMembers = clubData.members || [];
        
        // Remove the user from members
        const updatedMembers = currentMembers.filter(member => member.userId !== userId);
        
        await updateDoc(clubRef, {
          members: updatedMembers,
          updatedAt: serverTimestamp()
        });
        
        console.log('User left club successfully');
        return { ...clubData, members: updatedMembers };
      } else {
        throw new Error('Club not found');
      }
    } catch (error) {
      console.error('Error leaving club:', error);
      throw error;
    }
  },

  // Update club information
  async updateClub(clubId, updateData) {
    try {
      const clubRef = doc(db, COLLECTIONS.CLUBS, clubId);
      await updateDoc(clubRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id: clubId, ...updateData };
    } catch (error) {
      console.error('Error updating club:', error);
      throw error;
    }
  },

  // Delete a club
  async deleteClub(clubId) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.CLUBS, clubId));
      console.log('Club deleted:', clubId);
    } catch (error) {
      console.error('Error deleting club:', error);
      throw error;
    }
  }
};

// News Service
export const newsService = {
  // Get all news
  async getAllNews() {
    try {
      const q = query(collection(db, COLLECTIONS.NEWS), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const news = [];
      querySnapshot.forEach((doc) => {
        news.push({ id: doc.id, _id: doc.id, ...doc.data() });
      });
      return news;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  // Create news
  async createNews(newsData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.NEWS), {
        ...newsData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...newsData };
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }
};