export type LegalDocumentTemplate = {
  id: string;
  title: string;
  description: string;
  content: string;
};

const templates: LegalDocumentTemplate[] = [
  {
    id: 'blank',
    title: 'Blank Document',
    description: 'Start with an empty document.',
    content: '',
  },
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement (NDA)',
    description:
      'A standard agreement to protect confidential information shared between parties.',
    content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement (the "Agreement") is entered into as of [Date] by and between [Disclosing Party Name] ("Disclosing Party") and [Receiving Party Name] ("Receiving Party").

1.  **Confidential Information.** The Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party.

2.  **Obligations.** The Receiving Party shall not, without prior written approval of the Disclosing Party, use for its own benefit, publish, copy, or otherwise disclose to others any of the Confidential Information.

3.  **Term.** The non-disclosure provisions of this Agreement shall survive the termination of this Agreement and the Receiving Party's duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until the Disclosing Party sends the Receiving Party written notice releasing the Receiving Party from this Agreement.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

DISCLOSING PARTY:
___________________________
[Disclosing Party Name]


RECEIVING PARTY:
___________________________
[Receiving Party Name]`,
  },
  {
    id: 'lease',
    title: 'Residential Lease Agreement',
    description:
      'A basic contract for a landlord and tenant when renting a residential property.',
    content: `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement (the "Lease") is made and entered into this [Date], by and between [Landlord Name] ("Landlord") and [Tenant Name(s)] ("Tenant").

1.  **Property.** Landlord, in consideration of the rent to be paid and the covenants and agreements to be performed and observed by the Tenant, does hereby lease to the Tenant the following property: [Property Address].

2.  **Term.** The term of this Lease shall be for a period of [Number] months, commencing on [Start Date], and ending on [End Date].

3.  **Rent.** The total rent for the term hereof is the sum of [Total Rent Amount] Dollars ($[Amount]), payable on the [Day] of each month of the term.

4.  **Security Deposit.** Upon execution of this Lease, Tenant shall deposit with Landlord the sum of [Deposit Amount] Dollars ($[Amount]) as security for the faithful performance by Tenant of the terms hereof.

IN WITNESS WHEREOF, the Landlord and Tenant have executed this Lease as of the day and year first above written.

LANDLORD:
___________________________
[Landlord Name]


TENANT:
___________________________
[Tenant Name]`,
  },
];

export function getTemplateList(): LegalDocumentTemplate[] {
  return templates
    .filter((t) => t.id !== 'blank')
    .map(({ id, title, description, content }) => ({ id, title, description, content }));
}

export function getTemplate(id: string): LegalDocumentTemplate | undefined {
  return templates.find((template) => template.id === id);
}
