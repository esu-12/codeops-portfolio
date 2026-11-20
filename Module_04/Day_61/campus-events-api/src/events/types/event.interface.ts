
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  eventDate: string;
  category: string;
  isPublished: boolean;

  // User ID of the event creator
  createdBy?: string;
}