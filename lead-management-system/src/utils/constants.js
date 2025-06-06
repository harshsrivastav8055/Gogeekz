export const categories = {
  "Express Entry": {
    checklist: [
      "Language Test Completed",
      "Educational Credential Assessment",
      "Proof of Funds Documentation",
      "Police Clearance Certificate",
      "Medical Examination"
    ],
    fields: ["CRS Score", "NOC Code", "Invitation Date"]
  },
  'Study Permit': {
    fields: ['Institution Name', 'Program Duration', 'Tuition Fee (CAD)'],
    checklist: [
      'Letter of acceptance obtained',
      'Financial proof submitted',
      'Medical exam completed',
      'Biometrics appointment scheduled'
    ]
  },
  'Work Permit': {
    fields: ['Job Offer Details', 'LMIA Number', 'Employer Name'],
    checklist: [
      'Job offer letter received',
      'LMIA approval obtained',
      'Work contract signed',
      'Background check completed'
    ]
  }
};

export const sampleLeads = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0123',
    category: 'Express Entry',
    customFields: {
      'CRS Score': '450',
      'Work Experience (years)': '3',
      'Language Test Score': '8.0'
    },
    checklist: [false, true, false, false],
    documents: [
      { name: 'Resume.pdf', url: '#', type: 'pdf' },
      { name: 'Language_Test.jpg', url: '#', type: 'image' }
    ]
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1-555-0456',
    category: 'Study Permit',
    customFields: {
      'Institution Name': 'University of Toronto',
      'Program Duration': '2 years',
      'Tuition Fee (CAD)': '$45,000'
    },
    checklist: [true, true, false, true],
    documents: [
      { name: 'Acceptance_Letter.pdf', url: '#', type: 'pdf' }
    ]
  }
];