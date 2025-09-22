import { useState, useEffect } from 'react';
import { eventsService, clubsService, newsService } from '../services/firebaseService';

// Custom hook for fetching clubs
export const useClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    console.log('Refreshing clubs...');
    setRefreshKey(oldKey => oldKey + 1);
  };

  // Helper function to save memberships to localStorage
  const saveMemberships = (updatedClubs) => {
    try {
      const membershipData = {};
      updatedClubs.forEach(club => {
        if (club.members && club.members.length > 0) {
          membershipData[club._id || club.id] = club.members;
        }
      });
      localStorage.setItem('clubMemberships', JSON.stringify(membershipData));
      console.log('Saved memberships to localStorage:', membershipData);
    } catch (error) {
      console.error('Failed to save memberships:', error);
    }
  };

  // Helper function to load memberships from localStorage
  const loadMemberships = (clubs) => {
    try {
      const saved = localStorage.getItem('clubMemberships');
      if (saved) {
        const membershipData = JSON.parse(saved);
        console.log('Loaded memberships from localStorage:', membershipData);
        
        return clubs.map(club => {
          const clubId = club._id || club.id;
          if (membershipData[clubId]) {
            return { ...club, members: membershipData[clubId] };
          }
          return club;
        });
      }
    } catch (error) {
      console.error('Failed to load memberships:', error);
    }
    return clubs;
  };

  const addClub = async (newClub) => {
    console.log('Adding new club:', newClub);
    try {
      // Try to save to Firestore
      const savedClub = await clubsService.createClub(newClub);
      console.log('Club saved to Firestore:', savedClub);
      
      // Update local state
      setClubs(prevClubs => [savedClub, ...prevClubs]);
      return savedClub;
    } catch (error) {
      console.error('Failed to save club to Firestore:', error);
      throw error;
    }
  };

  const joinClub = async (clubId, userId, userDisplayName) => {
    console.log('Joining club:', { clubId, userId, userDisplayName });
    try {
      // Try Firestore first
      const updatedClub = await clubsService.joinClub(clubId, userId, userDisplayName);
      console.log('Firestore join successful:', updatedClub);
      
      // Update local state
      setClubs(prevClubs => {
        const newClubs = prevClubs.map(club => 
          club._id === clubId || club.id === clubId 
            ? { ...club, members: updatedClub.members }
            : club
        );
        saveMemberships(newClubs);
        return newClubs;
      });
      return updatedClub;
    } catch (firestoreError) {
      console.log('Firestore join failed, using local state:', firestoreError);
      
      // Fallback to local state update for demo data
      const newMember = {
        userId,
        displayName: userDisplayName,
        joinedAt: new Date().toISOString()
      };
      
      setClubs(prevClubs => {
        const newClubs = prevClubs.map(club => {
          if (club._id === clubId || club.id === clubId) {
            const currentMembers = club.members || [];
            
            // Check if already a member
            const isAlreadyMember = currentMembers.some(member => 
              member.userId === userId || member === userId
            );
            
            if (isAlreadyMember) {
              throw new Error('User is already a member of this club');
            }
            
            return {
              ...club,
              members: [...currentMembers, newMember]
            };
          }
          return club;
        });
        
        // Save to localStorage
        saveMemberships(newClubs);
        return newClubs;
      });
      
      return { success: true, message: 'Joined club successfully (demo mode)' };
    }
  };

  const leaveClub = async (clubId, userId) => {
    console.log('Leaving club:', { clubId, userId });
    try {
      // Try Firestore first
      const updatedClub = await clubsService.leaveClub(clubId, userId);
      console.log('Firestore leave successful:', updatedClub);
      
      // Update local state
      setClubs(prevClubs => {
        const newClubs = prevClubs.map(club => 
          club._id === clubId || club.id === clubId 
            ? { ...club, members: updatedClub.members }
            : club
        );
        saveMemberships(newClubs);
        return newClubs;
      });
      return updatedClub;
    } catch (firestoreError) {
      console.log('Firestore leave failed, using local state:', firestoreError);
      
      // Fallback to local state update for demo data
      setClubs(prevClubs => {
        const newClubs = prevClubs.map(club => {
          if (club._id === clubId || club.id === clubId) {
            const updatedMembers = (club.members || []).filter(member => 
              member.userId !== userId && member !== userId
            );
            
            return {
              ...club,
              members: updatedMembers
            };
          }
          return club;
        });
        
        // Save to localStorage
        saveMemberships(newClubs);
        return newClubs;
      });
      
      return { success: true, message: 'Left club successfully (demo mode)' };
    }
  };

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching clubs from Firestore...');
        // Try Firestore first
        const firestoreClubs = await clubsService.getAllClubs();
        console.log('Firestore clubs:', firestoreClubs);
        const clubsWithMemberships = loadMemberships(firestoreClubs);
        setClubs(clubsWithMemberships);
        
      } catch (firestoreError) {
        console.error('Firestore clubs fetch failed:', firestoreError);
        
        try {
          console.log('Trying backend API...');
          // Try backend API as second option
          const response = await fetch('http://localhost:3001/api/clubs');
          if (response.ok) {
            const backendClubs = await response.json();
            console.log('Backend clubs:', backendClubs);
            setClubs(backendClubs);
            return;
          }
        } catch (backendError) {
          console.error('Backend clubs fetch failed:', backendError);
        }
        
        // Fallback to demo data
        const demoClubs = [
          {
            _id: '1',
            name: '🤖 Robotics Club',
            category: 'Technology',
            description: 'Building robots and exploring automation technology. Join us to create the future!',
            members: [],
            createdAt: new Date().toISOString(),
            image: '🤖'
          },
          {
            _id: '2', 
            name: '🎭 Drama Society',
            category: 'Arts',
            description: 'Theater performances and acting workshops. Express yourself through the performing arts!',
            members: [],
            createdAt: new Date().toISOString(),
            image: '🎭'
          },
          {
            _id: '3',
            name: '🏀 Basketball Club',
            category: 'Sports',
            description: 'Competitive basketball and training sessions. Shoot for the stars!',
            members: [],
            createdAt: new Date().toISOString(),
            image: '🏀'
          },
          {
            _id: '4',
            name: '📚 Book Club',
            category: 'Academic',
            description: 'Exploring literature and sharing book reviews. Feed your mind with great stories!',
            members: [],
            createdAt: new Date().toISOString(),
            image: '📚'
          },
          {
            _id: '5',
            name: '🎨 Art Society',
            category: 'Arts',
            description: 'Painting, drawing, and creative expression. Let your creativity flow!',
            members: [],
            createdAt: new Date().toISOString(),
            image: '🎨'
          },
          {
            _id: '6',
            name: '♻️ Environmental Club',
            category: 'Service',
            description: 'Making campus greener and more sustainable. Protect our planet together!',
            members: [],
            createdAt: new Date().toISOString(),
            image: '♻️'
          }
        ];
        
        console.log('Using demo clubs:', demoClubs);
        const clubsWithMemberships = loadMemberships(demoClubs);
        setClubs(clubsWithMemberships);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [refreshKey]);

  return { clubs, loading, error, refresh, addClub, joinClub, leaveClub };
};

// Custom hook for fetching events with Firestore
export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    console.log('Refreshing events...');
    setRefreshKey(oldKey => oldKey + 1);
  };

  const addEvent = async (newEvent) => {
    console.log('Adding new event:', newEvent);
    try {
      // Try to save to Firestore first
      const savedEvent = await eventsService.createEvent(newEvent);
      console.log('Event saved to Firestore:', savedEvent);
      
      // Update local state with validation
      setEvents(prevEvents => {
        const validPrevEvents = prevEvents.filter(event => event && (event._id || event.id));
        return [savedEvent, ...validPrevEvents];
      });
      return savedEvent;
    } catch (error) {
      console.error('Failed to save to Firestore, using local storage:', error);
      
      // Fallback to localStorage
      const localEvent = { ...newEvent, _id: 'local-' + Date.now() };
      const storedEvents = loadStoredEvents();
      const updatedEvents = [localEvent, ...storedEvents];
      localStorage.setItem('userCreatedEvents', JSON.stringify(updatedEvents));
      setEvents(prevEvents => {
        const validPrevEvents = prevEvents.filter(event => event && (event._id || event.id));
        return [localEvent, ...validPrevEvents];
      });
      return localEvent;
    }
  };

  const loadStoredEvents = () => {
    try {
      const stored = localStorage.getItem('userCreatedEvents');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading stored events:', e);
      return [];
    }
  };

  const clearStoredEvents = () => {
    localStorage.removeItem('userCreatedEvents');
    console.log('Cleared stored events');
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching events from Firestore...');
        // Try Firestore first
        const firestoreEvents = await eventsService.getAllEvents();
        console.log('Firestore events:', firestoreEvents);
        const eventsWithRSVPs = loadRSVPs(firestoreEvents);
        const validEvents = eventsWithRSVPs.filter(event => event && (event._id || event.id));
        setEvents(validEvents);
        
      } catch (firestoreError) {
        console.error('Firestore fetch failed:', firestoreError);
        
        // Fallback to localStorage + backend + demo data
        const storedEvents = loadStoredEvents();
        console.log('Loaded stored events:', storedEvents);
        
        try {
          // Try backend API
          let serverEvents = [];
          try {
            const response = await fetch('/api/events');
            if (response.ok) {
              serverEvents = await response.json();
            } else {
              throw new Error('Proxy fetch failed');
            }
          } catch (proxyError) {
            console.log('Proxy fetch failed, trying direct URL:', proxyError);
            try {
              const response = await fetch('http://localhost:3001/api/events');
              if (response.ok) {
                serverEvents = await response.json();
              }
            } catch (directError) {
              console.log('Direct fetch also failed:', directError);
              serverEvents = [];
            }
          }
          
          // Use demo data if no server events
          if (serverEvents.length === 0) {
            serverEvents = [
              {
                _id: '1',
                title: 'Robot Competition',
                date: '2025-09-25T00:00:00.000Z',
                description: 'Annual robotics competition',
                organizerId: { name: 'Robotics Club' },
                attendees: []
              },
              {
                _id: '2',
                title: 'Annual Drama Performance',
                date: '2025-09-28T00:00:00.000Z',
                description: 'End of year theater show',
                organizerId: { name: 'Drama Society' },
                attendees: []
              },
              {
                _id: '3',
                title: 'Basketball Tournament',
                date: '2025-10-01T00:00:00.000Z',
                description: 'Inter-college basketball tournament',
                organizerId: { name: 'Basketball Club' },
                attendees: []
              }
            ];
          }
          
          // Combine stored events with server events
          const allEvents = [...storedEvents, ...serverEvents];
          console.log('Combined events (fallback):', allEvents);
          const eventsWithRSVPs = loadRSVPs(allEvents);
          const validEvents = eventsWithRSVPs.filter(event => event && (event._id || event.id));
          setEvents(validEvents);
          setError('Using local/demo data (Firestore connection issue)');
          
        } catch (fallbackError) {
          console.error('All fetch methods failed:', fallbackError);
          const storedEvents = loadStoredEvents();
          const validEvents = storedEvents.filter(event => event && (event._id || event.id));
          setEvents(validEvents);
          setError('Using stored data only');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [refreshKey]);

  // Helper functions for RSVP persistence
  const saveRSVPs = (updatedEvents) => {
    try {
      const rsvpData = {};
      updatedEvents.forEach(event => {
        if (event.attendees && event.attendees.length > 0) {
          rsvpData[event._id || event.id] = event.attendees;
        }
      });
      localStorage.setItem('eventRSVPs', JSON.stringify(rsvpData));
      console.log('Saved RSVPs to localStorage:', rsvpData);
    } catch (error) {
      console.error('Failed to save RSVPs:', error);
    }
  };

  const loadRSVPs = (events) => {
    try {
      const saved = localStorage.getItem('eventRSVPs');
      if (saved) {
        const rsvpData = JSON.parse(saved);
        console.log('Loaded RSVPs from localStorage:', rsvpData);
        
        return events.map(event => {
          const eventId = event._id || event.id;
          if (rsvpData[eventId]) {
            return { ...event, attendees: rsvpData[eventId] };
          }
          return event;
        });
      }
    } catch (error) {
      console.error('Failed to load RSVPs:', error);
    }
    return events;
  };

  const rsvpToEvent = async (eventId, userId, userDisplayName) => {
    console.log('RSVPing to event:', { eventId, userId, userDisplayName });
    try {
      // Try Firestore first
      const updatedEvent = await eventsService.rsvpToEvent(eventId, userId, userDisplayName);
      console.log('Firestore RSVP successful:', updatedEvent);
      
      // Update local state
      setEvents(prevEvents => {
        const newEvents = prevEvents.map(event => 
          event._id === eventId || event.id === eventId 
            ? { ...event, attendees: updatedEvent.attendees }
            : event
        );
        saveRSVPs(newEvents);
        return newEvents;
      });
      return updatedEvent;
    } catch (firestoreError) {
      console.log('Firestore RSVP failed, using local state:', firestoreError);
      
      // Fallback to local state update for demo data
      const newAttendee = {
        userId,
        displayName: userDisplayName,
        rsvpedAt: new Date().toISOString()
      };
      
      setEvents(prevEvents => {
        // First filter out any undefined/null events
        const validEvents = prevEvents.filter(event => event && (event._id || event.id));
        
        const newEvents = validEvents.map(event => {
          if (event._id === eventId || event.id === eventId) {
            const currentAttendees = event.attendees || [];
            
            // Check if already RSVP'd with array safety
            const isAlreadyRSVPed = Array.isArray(currentAttendees) && currentAttendees.some(attendee => 
              attendee.userId === userId || attendee === userId
            );
            
            if (isAlreadyRSVPed) {
              throw new Error('User has already RSVP\'d to this event');
            }
            
            return {
              ...event,
              attendees: [...currentAttendees, newAttendee]
            };
          }
          return event;
        });
        
        // Save to localStorage
        saveRSVPs(newEvents);
        return newEvents;
      });
      
      return { success: true, message: 'RSVP successful (demo mode)' };
    }
  };

  const cancelRSVP = async (eventId, userId) => {
    console.log('Canceling RSVP for event:', { eventId, userId });
    try {
      // Try Firestore first
      const updatedEvent = await eventsService.cancelRSVP(eventId, userId);
      console.log('Firestore cancel RSVP successful:', updatedEvent);
      
      // Update local state
      setEvents(prevEvents => {
        const newEvents = prevEvents.map(event => 
          event._id === eventId || event.id === eventId 
            ? { ...event, attendees: updatedEvent.attendees }
            : event
        );
        saveRSVPs(newEvents);
        return newEvents;
      });
      return updatedEvent;
    } catch (firestoreError) {
      console.log('Firestore cancel RSVP failed, using local state:', firestoreError);
      
      // Fallback to local state update for demo data
      setEvents(prevEvents => {
        // First filter out any undefined/null events
        const validEvents = prevEvents.filter(event => event && (event._id || event.id));
        
        const newEvents = validEvents.map(event => {
          if (event._id === eventId || event.id === eventId) {
            const updatedAttendees = (event.attendees || []).filter(attendee => 
              attendee.userId !== userId && attendee !== userId
            );
            
            return {
              ...event,
              attendees: updatedAttendees
            };
          }
          return event;
        });
        
        // Save to localStorage
        saveRSVPs(newEvents);
        return newEvents;
      });
      
      return { success: true, message: 'RSVP canceled successfully (demo mode)' };
    }
  };

  return { events, loading, error, refresh, addEvent, clearStoredEvents, rsvpToEvent, cancelRSVP };
};

// Custom hook for fetching news
export const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    console.log('Refreshing news...');
    setRefreshKey(oldKey => oldKey + 1);
  };

  const addNews = async (newArticle) => {
    console.log('Adding new news article:', newArticle);
    try {
      // Try to save to Firestore
      const savedArticle = await newsService.createNews(newArticle);
      console.log('News saved to Firestore:', savedArticle);
      
      // Update local state
      setNews(prevNews => [savedArticle, ...prevNews]);
      return savedArticle;
    } catch (error) {
      console.error('Failed to save news to Firestore:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching news from Firestore...');
        // Try Firestore first
        const firestoreNews = await newsService.getAllNews();
        console.log('Firestore news:', firestoreNews);
        setNews(firestoreNews);
        
      } catch (firestoreError) {
        console.error('Firestore news fetch failed:', firestoreError);
        
        // Fallback to demo data
        const demoNews = [
          {
            _id: '1',
            title: '🎉 Welcome to CLUBBEE Campus!',
            content: 'Discover amazing clubs, connect with fellow students, and elevate your campus experience. Join clubs that match your interests and make lasting connections.',
            authorId: { name: 'CLUBBEE Team' },
            date: new Date().toISOString(),
            category: 'announcement',
            imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            _id: '2',
            title: '📅 Spring Club Fair Next Week',
            content: 'Join us for the biggest club fair of the semester! Meet representatives from over 50 student organizations and find your perfect fit.',
            authorId: { name: 'Student Activities' },
            date: new Date(Date.now() - 86400000).toISOString(),
            category: 'event',
            imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            _id: '3',
            title: '🏆 Club Achievement Awards',
            content: 'Congratulations to all clubs that participated in this semester\'s activities! Awards ceremony will be held next Friday in the main auditorium.',
            authorId: { name: 'Dean of Students' },
            date: new Date(Date.now() - 172800000).toISOString(),
            category: 'achievement',
            imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
        ];
        
        console.log('Using demo news data:', demoNews);
        setNews(demoNews);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [refreshKey]);

  return { news, loading, error, refresh, addNews };
};

// Custom hook for dashboard stats
export const useDashboardStats = () => {
  const { clubs, loading: clubsLoading } = useClubs();
  const { events, loading: eventsLoading } = useEvents();
  const { news, loading: newsLoading } = useNews();

  const loading = clubsLoading || eventsLoading || newsLoading;

  const stats = {
    totalClubs: clubs.length,
    upcomingEvents: events.filter(event => new Date(event.date) > new Date()).length,
    totalNews: news.length,
    myClubs: 3, // This would come from user data
    badges: 7    // This would come from user data
  };

  return { stats, loading };
};