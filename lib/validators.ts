import * as z from 'zod';

export const resumeFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(5, { message: 'Phone number is required.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  summary: z.string().min(10, { message: 'Professional summary is required (min 10 chars).' }),
  skills: z.string().min(2, { message: 'Please enter at least one skill. Comma separated.' }),
  experience: z.array(
    z.object({
      jobTitle: z.string().min(2, 'Job title is required.'),
      company: z.string().min(2, 'Company name is required.'),
      duration: z.string().min(2, 'Duration is required (e.g. 2020 - 2023).'),
      description: z.string().min(10, 'Description is required.'),
    })
  ).min(1, 'Please add at least one work experience.'),
  education: z.array(
    z.object({
      degree: z.string().min(2, 'Degree is required.'),
      institution: z.string().min(2, 'Institution name is required.'),
      year: z.string().min(4, 'Graduation year is required.'),
    })
  ).min(1, 'Please add at least one education record.'),
  projects: z.array(
    z.object({
      title: z.string().min(2, 'Project title is required.'),
      description: z.string().min(10, 'Project description is required.'),
    })
  ).optional(),
  certifications: z.string().optional(),
});

export type ResumeFormValues = z.infer<typeof resumeFormSchema>;
