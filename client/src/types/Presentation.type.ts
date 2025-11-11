export interface Presentation {
    _id: string;
    titre: string;
    assignedTo: User[];
    date: string;
    status: "pending" | "confirmed" | "completed" | "urgent" | string; // Added 'urgent' example
    description: string;
}