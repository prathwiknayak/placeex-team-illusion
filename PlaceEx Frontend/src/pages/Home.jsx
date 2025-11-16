import { Link } from "react-router-dom";

const recruiters = [
  { name: "Google",  logo: "https://logo.clearbit.com/google.com" },
  { name: "Amazon",  logo: "https://logo.clearbit.com/amazon.com" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
  { name: "NVIDIA", logo: "https://logo.clearbit.com/nvidia.com" },
  { name: "Oracle",  logo: "https://logo.clearbit.com/oracle.com" },
  { name: "jio",   logo: "https://logo.clearbit.com/jio.com" },
  { name: "Uber",    logo: "https://logo.clearbit.com/uber.com" },
  { name: "Intel",   logo: "https://logo.clearbit.com/intel.com" },
  { name: "SAP",     logo: "https://logo.clearbit.com/sap.com" },
  { name: "Atlassian", logo: "https://logo.clearbit.com/atlassian.com" },
  { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com" },
  { name: "blinkit",   logo: "https://logo.clearbit.com/blinkit.com" },
  { name: "rolex",    logo: "https://logo.clearbit.com/rolex.com" },
  { name: "dell",   logo: "https://logo.clearbit.com/dell.com" },
  { name: "asus",     logo: "https://logo.clearbit.com/asus.com" },
  { name: "walmart", logo: "https://logo.clearbit.com/walmart.com" },
  { name: "ikea", logo: "https://logo.clearbit.com/ikea.com" },
  { name: "tata", logo: "https://logo.clearbit.com/tata.com" },
  { name: "tcs", logo: "https://logo.clearbit.com/tcs.com" },
];

const seniors = [
  { name: "Rahul Sharma", company: "Google", ctc: "45 LPA", branch: "CSE", img: "https://i.pravatar.cc/100?img=3", linkedin: "https://linkedin.com" },
  { name: "Sneha Rao", company: "Amazon", ctc: "36 LPA", branch: "ECE", img: "https://i.pravatar.cc/100?img=5", linkedin: "https://linkedin.com" },
  { name: "Arjun N", company: "Microsoft", ctc: "32 LPA", branch: "ISE", img: "https://i.pravatar.cc/100?img=7", linkedin: "https://linkedin.com" },
  { name: "Divya K", company: "NVIDIA", ctc: "40 LPA", branch: "AIML", img: "https://i.pravatar.cc/100?img=9", linkedin: "https://linkedin.com" },
{ name: "Nandan Pai", company: "DE SHAW", ctc: "40 LPA", branch: "AIML", img: "https://i.pravatar.cc/100?img=11", linkedin: "https://linkedin.com" },
];

export default function Home() {
  const stats = { experiences: 128, students: 2400, companies: 312 };

  return (
    <div className="min-h-screen w-full">
      {/* HERO */}
      <section className="w-full px-6 pt-10 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Title */}
          <div>
            <h1 className="leading-tight font-extrabold tracking-tight">
              <span className="block text-4xl sm:text-5xl">PlaceEx</span>
              <span className="block mt-1 text-5xl sm:text-6xl">
               <span className="block text-4xl sm:text-5xl">Unlock Your Placement</span>
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg opacity-80 max-w-3xl">
              Read real interview experiences, scan your resume with ATS, discover companies, and
              get guidance from seniors — in one place.
            </p>

            {/* Counters */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-3xl">
              <StatCard label="Experiences Shared" value={stats.experiences} />
              <StatCard label="Students Benefited" value={stats.students} />
              <StatCard label="Recruiter companies" value={stats.companies} />
            </div>
          </div>

          {/* Right: Highlights */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-xl font-semibold mb-2">PlaceEx Highlights</div>
            <ul className="list-disc pl-6 space-y-2 text-sm opacity-80">
              <li>Share & discover interview experiences across branches/roles.</li>
              <li>ATS scan with pass/fail, 10-point score, and tips.</li>
              <li>Company directory with filters (branch, role, skills).</li>
              <li>Built-in AI assistant for quick guidance.</li>
            </ul>
            <div className="mt-4 rounded-xl h-32 bg-gradient-to-r from-cyan-200 to-cyan-50 border border-cyan-100 dark:from-cyan-900/30 dark:to-cyan-700/10 dark:border-cyan-800/40" />
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="w-full px-6 py-6 grid md:grid-cols-2 gap-4">
        <InfoCard
          title="Experience Box"
          desc="Seniors share interview rounds, questions, and resources. Add your resume, reference files, and links."
          to="/experience"
          cta="Explore Experience"
        />
        <InfoCard
          title="Company Box"
          desc="View experiences grouped by company. Filter by branch, role, and skills to tailor your prep."
          to="/companies"
          cta="Explore Companies"
        />
      </section>

      {/* Recruiters */}
      <section className="w-full px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl font-semibold">Recruter Companies</h2>
          <Link to="/companies" className="text-sm font-semibold hover:opacity-80">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 items-center">
          {recruiters.map((r) => (
            <div
              key={r.name}
              className="h-14 rounded-xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center overflow-hidden"
            >
              <img
                src={r.logo}
                alt={r.name}
                className="max-h-9 max-w-[80%] object-contain"
                onError={(e) => {
                  e.currentTarget.style.opacity = 0.3;
                  e.currentTarget.alt = r.name;
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Senior Experiences strip */}
      <section className="w-full px-6 py-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl font-semibold">Senior Experiences</h2>
          <Link to="/experience" className="text-sm font-semibold hover:opacity-80">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-4 min-w-max pr-2">
            {seniors.map((s, i) => (
              <article
                key={i}
                className="w-72 shrink-0 rounded-2xl bg-white border border-gray-200 shadow-sm p-4 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <img src={s.img} alt={s.name} className="w-12 h-12 rounded-full border" />
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{s.name}</div>
                    <div className="text-sm opacity-80 truncate">{s.company} • {s.ctc}</div>
                    <div className="text-xs opacity-70">{s.branch}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a href={s.linkedin} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
                    LinkedIn
                  </a>
                  <Link to="/experience" className="px-3 py-1 rounded-xl text-sm bg-brand text-slate-900">
                    Read
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>  
    </div>
  );
}

/* --- small presentational bits --- */
function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="text-sm opacity-70">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      <div className="mt-3 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div className="h-full bg-brand/35 w-full" />
      </div>
    </div>
  );
}

function InfoCard({ title, desc, to, cta }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col dark:bg-gray-800 dark:border-gray-700">
      <div className="text-lg font-semibold">{title}</div>
      <p className="opacity-80 text-sm mt-1 flex-1">{desc}</p>
      <Link to={to} className="mt-4 self-start px-4 py-2 rounded-xl font-semibold bg-brand text-slate-900">
        {cta}
      </Link>
    </div>
  );
}

function ContactBtn({ name, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
      title={name}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 2-2.88 4v7.6h-4V8z"/>
      </svg>
      {name}
    </a>
  );
}
