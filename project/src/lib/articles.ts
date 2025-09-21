type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
};

const articles: Article[] = [
  {
    slug: 'understanding-contracts',
    title: 'Understanding Contracts: The Basics',
    excerpt: 'Learn the fundamental elements of a legally binding contract and what to look out for before you sign.',
    content: `
      <h2>What Makes a Contract Legally Binding?</h2>
      <p>A contract is an agreement between two or more parties that creates mutual obligations enforceable by law. To be legally binding, a contract must contain several key elements:</p>
      <ul>
        <li><strong>Offer:</strong> One party must make a clear and definite proposal to another.</li>
        <li><strong>Acceptance:</strong> The other party must accept the offer without any changes. A counter-offer is a rejection of the original offer.</li>
        <li><strong>Consideration:</strong> Each party must give something of value to the other, such as money, goods, or services.</li>
        <li><strong>Mutual Assent:</strong> Both parties must agree to the essential terms of the contract. This is also known as a "meeting of the minds."</li>
        <li><strong>Capacity:</strong> Both parties must be legally competent to enter into a contract (e.g., not minors or mentally incapacitated).</li>
        <li><strong>Legality:</strong> The purpose of the contract must be legal.</li>
      </ul>
      <h2>Common Clauses to Watch For</h2>
      <p>When reviewing a contract, pay close attention to clauses like Indemnification, Limitation of Liability, and Jurisdiction. These can have significant financial and legal implications.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/contract/600/400',
    imageHint: 'contract document'
  },
  {
    slug: 'what-is-a-tort',
    title: 'What is a Tort? An Introduction to Civil Wrongs',
    excerpt: 'Explore the concept of a tort, the difference between intentional and unintentional torts, and common examples.',
    content: `
      <h2>Defining a Tort</h2>
      <p>A tort is a civil wrong that causes a claimant to suffer loss or harm, resulting in legal liability for the person who commits the tortious act. Unlike criminal law, which deals with wrongs against the state, tort law deals with wrongs between private individuals.</p>
      <h2>Types of Torts</h2>
      <p>Torts are generally categorized into three main types:</p>
      <ul>
        <li><strong>Intentional Torts:</strong> These are wrongs that the defendant knew or should have known would result from their actions. Examples include battery, assault, and defamation.</li>
        <li><strong>Negligence:</strong> This is the most common type of tort. It occurs when a person fails to exercise the level of care that a reasonable person would in a similar situation, causing harm to another.</li>
        <li><strong>Strict Liability:</strong> In some cases, a person can be held liable for harm regardless of their level of care. This often applies to abnormally dangerous activities or defective products.</li>
      </ul>
    `,
    imageUrl: 'https://picsum.photos/seed/gavel/600/400',
    imageHint: 'gavel law'
  },
  {
    slug: 'intellectual-property-101',
    title: 'Intellectual Property 101: Patents, Trademarks, and Copyrights',
    excerpt: 'A beginner\'s guide to the different types of intellectual property and how they protect creations and inventions.',
    content: `
      <h2>The Pillars of IP</h2>
      <p>Intellectual Property (IP) refers to creations of the mind, such as inventions; literary and artistic works; designs; and symbols, names, and images used in commerce. IP is protected in law by, for example, patents, copyright, and trademarks.</p>
      <ul>
        <li><strong>Patents:</strong> A patent grants an inventor the right to exclude others from making, using, or selling their invention for a limited period. There are three types: utility, design, and plant patents.</li>
        <li><strong>Trademarks:</strong> A trademark is a word, phrase, symbol, or design that identifies and distinguishes the source of the goods of one party from those of others. Service marks distinguish the source of a service rather than goods.</li>
        <li><strong>Copyrights:</strong> Copyright protects original works of authorship, such as books, music, art, and software. It gives the owner the exclusive right to reproduce, distribute, and display the work.</li>
      </ul>
    `,
    imageUrl: 'https://picsum.photos/seed/lightbulb/600/400',
    imageHint: 'idea lightbulb'
  },
  {
    slug: 'the-importance-of-estate-planning',
    title: 'The Importance of Estate Planning',
    excerpt: 'Understand why wills, trusts, and powers of attorney are crucial tools for managing your assets and legacy.',
    content: `
      <h2>What is Estate Planning?</h2>
      <p>Estate planning is the process of arranging for the management and disposal of a person's estate during their life, at and after death, while minimizing gift, estate, generation-skipping transfer, and income tax. Key components include:</p>
      <ul>
        <li><strong>Will:</strong> A legal document that sets forth your wishes regarding the distribution of your property and the care of any minor children.</li>
        <li><strong>Trust:</strong> A legal arrangement through which one person (a trustee) holds property for the benefit of another person (a beneficiary). Trusts can help avoid probate and offer more control over asset distribution.</li>
        <li><strong>Power of Attorney:</strong> A document that gives someone you trust the authority to handle financial or medical decisions on your behalf if you become incapacitated.</li>
      </ul>
      <p>Proper estate planning ensures your assets are distributed according to your wishes and can save your loved ones time, money, and stress.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/family/600/400',
    imageHint: 'family planning'
  }
];

export function getArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
