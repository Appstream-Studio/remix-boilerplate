////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  role?: string;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(
  query?: string | null,
): Promise<ContactRecord[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();

  // Filter contacts based on query
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }

  contacts = contacts.sort(sortBy("last", "createdAt"));

  return contacts;
}

export async function createNewContact(values: ContactMutation) {
  const contact = await fakeContacts.create(values);
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://framerusercontent.com/images/PpOMorpSHhHn4LJW8YPDFtBFVc.jpg",
    first: "Justin",
    last: "T.",
    role: "Co-founder & CEO",
    twitter: "",
  },
  {
    avatar:
      "https://framerusercontent.com/images/FPEJTNGYyNN5D2xRatLvBxare4.jpg",
    first: "Łukasz",
    last: "C.",
    role: "Co-founder & CTO",
    twitter: "",
  },
  {
    avatar:
      "https://framerusercontent.com/images/AveLGYmvyW1NmkHrQvmhG4sa4s.png",
    first: "Piotr",
    last: "S.",
    role: "Co-founder & Head of Engineering",
    twitter: "",
  },
  {
    avatar:
      "https://framerusercontent.com/images/RB9eU35INhbjAf2JcCHNkc014.jpg",
    first: "Bart",
    last: "B.",
    role: "Founding CloudOps & Security Lead",
    twitter: "",
  },
  {
    avatar:
      "https://framerusercontent.com/images/OuPyFjcRQnW2cRPSqCdstqp4c.jpg",
    first: "Cesar",
    last: "B.",
    role: "Founding Sr. Software Engineer",
    twitter: "",
  },
  {
    avatar:
      "https://framerusercontent.com/images/qtZzNSK9FPZRKMQ27TLTTR9qVw.jpg",
    first: "Takami",
    last: "R.",
    role: "Sr. Software Engineer",
    twitter: "",
  },
  {
    avatar:
      "https://framerusercontent.com/images/hWbEwNRRChPfdiHPywjkGysk7Y.png",
    first: "Ilia",
    last: "A.",
    role: "Sr. Software Engineer",
    twitter: "",
  },
  {
    avatar:
      "https://framerusercontent.com/images/SHL31Zn9KWeGblv5jaJVYHsFPSI.jpg",
    first: "Betsy",
    last: "T.",
    role: "General Counsel",
    twitter: "",
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
