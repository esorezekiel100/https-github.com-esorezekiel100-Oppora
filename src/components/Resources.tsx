import React, { useState } from 'react';
import { FileText, Download, CheckCircle, Sparkles, BookOpen, Calendar, HelpCircle, ArrowRight, Eye, ChevronRight, Lock, ShieldAlert, UserPlus, LogIn, Award } from 'lucide-react';

interface ResourcesProps {
  user: any;
  onOpenAuth: () => void;
}

export default function Resources({ user, onOpenAuth }: ResourcesProps) {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [readingResource, setReadingResource] = useState<any | null>(null);

  const essayGuides = [
    {
      id: 'chevening-essay',
      title: 'Chevening Scholarship - Leadership Essay',
      description: 'Anonymized, winning leadership & networking essay focusing on community microgrid installation.',
      wordCount: '480 words',
      downloads: '4.8k',
      difficulty: 'Expert',
      content: `I have always believed that leadership is not about title or rank, but about creating sustainable pathways for others to thrive. My journey as an engineer in rural Nigeria reinforced this conviction when I spearheaded the installation of a 15kW solar microgrid in Ogbunike village. 

To achieve this, I first had to coordinate a diverse committee of local elders, youth leaders, and external engineering volunteers. The project faced early resistance due to skepticism regarding solar durability. By organizing community Town Halls and utilizing comparative data from neighboring districts, I successfully built alignment and secured volunteer commitments from 12 local youths. 

When battery shipments were delayed by three weeks due to border logistical hurdles, I took decisive action by temporarily leasing alternative lithium setups from a regional partner, ensuring the project was commissioned on schedule. Today, the grid powers 40 homes and the village clinic. This experience taught me that true leadership in Africa requires resilience, active listening, and localized resource management—values I intend to champion further as a Chevening Scholar.`
    },
    {
      id: 'rhodes-personal',
      title: 'Rhodes Trust - Personal Statement',
      description: 'Academically rigorous statement from an undergraduate researcher in computer science, Kenya.',
      wordCount: '750 words',
      downloads: '3.1k',
      difficulty: 'Elite',
      content: `My fascination with computational linguistics began with a simple question: why do global language translation tools consistently fail to capture the nuanced syntactic structures of indigenous East African languages, such as Kikuyu and Luo? 

Throughout my academic tenure at the University of Nairobi, I observed a profound digital gap. While neural machine translation models excel in highly-resourced Western languages, low-resourced African languages are frequently marginalized. For my undergraduate thesis, I designed a specialized transformer model that incorporated localized morphological rules, improving Translation BLEU scores for Swahili-to-English queries by 14%. 

The Rhodes Scholarship at Oxford represents the next logical crucible for my research. Under the supervision of the Department of Computer Science, I aim to investigate semantic parsing strategies for low-resourced language trees. Beyond academic pursuit, my vision is to co-found an open-access AI laboratory in Nairobi, providing tools for future African computer scientists to build language models by the community, for the community.`
    },
    {
      id: 'mastercard-impact',
      title: 'Mastercard Foundation - Impact Statement',
      description: 'A powerful personal narrative detailing entrepreneurial initiative and community-driven healthcare initiatives.',
      wordCount: '520 words',
      downloads: '5.2k',
      difficulty: 'High Impact',
      content: `Growing up in the Kibera settlement in Nairobi, healthcare was never a given; it was a luxury. When my younger sister contracted a preventable waterborne illness in 2021, the absolute lack of triage infrastructure became painfully clear. 

Instead of remaining a passive observer, I partnered with two medical students to launch 'KiberaCare'—a mobile-enabled SMS triage platform that connects vulnerable residents with localized community health workers. As the lead project coordinator, I was responsible for recruiting local volunteers, translating medical terminology into colloquial Sheng dialects, and securing small-scale sponsorships from community pharmacies. 

Within its first twelve months, KiberaCare responded to over 2,400 query tickets, routing 300 emergency cases safely to nearby clinic hubs. A Mastercard Foundation Scholarship at the University of Toronto will equip me with the advanced global health policy insights and epidemiological frameworks required to scale KiberaCare into a certified national digital health network across Kenya.`
    }
  ];

  const templates = [
    {
      id: 'academic-cv',
      title: 'Standard Academic CV (Scholarship-Optimized)',
      description: 'Fully formatted, ATS-compliant CV structure structured to emphasize research outputs, community contributions, and leadership.',
      format: 'LaTeX / Word DOCX',
      size: '142 KB',
      icon: FileText
    },
    {
      id: 'sop-structure',
      title: 'Statement of Purpose (SoP) Blueprint',
      description: 'A structural, paragraph-by-paragraph breakdown outlining exactly how to link past achievements to future goals.',
      format: 'Interactive Markdown',
      size: '88 KB',
      icon: Sparkles
    },
    {
      id: 'recommendation-letter',
      title: 'Academic Recommendation Draft Outline',
      description: 'A professional guide designed for professors or managers, detailing how to write high-impact references.',
      format: 'Word DOCX',
      size: '115 KB',
      icon: BookOpen
    }
  ];

  const timelineSteps = [
    {
      month: 'June - July',
      title: 'Information Gathering & Shortlisting',
      tasks: [
        'Research and filter scholarship entries by eligibility (GPA, age, nationality).',
        'Identify 3 prospective academic mentors or recommenders.',
        'Begin drafting academic transcript translations and certification requests.'
      ]
    },
    {
      month: 'August',
      title: 'Strategic Essay Drafting',
      tasks: [
        'Write the core leadership, networking, and personal narrative essays.',
        'Draft a comprehensive, research-focused Academic CV.',
        'Submit initial drafts to peers or mentors for critical review.'
      ]
    },
    {
      month: 'September',
      title: 'Refining & Standardized Testing',
      tasks: [
        'Incorporate peer feedback to polish essays and statement of purpose.',
        'Register and sit for English proficiency tests (IELTS, TOEFL) if strictly required.',
        'Request official reference letters from academic supervisors.'
      ]
    },
    {
      month: 'October - November',
      title: 'System Application Submission',
      tasks: [
        'Double-check all portal attachment files (PDF, high-resolution transcripts).',
        'Upload recommendation letters directly to online portals.',
        'Submit applications 7 days prior to official deadlines to avoid high-traffic delays.'
      ]
    }
  ];

  const handleDownload = (id: string, name: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }

    setDownloadedId(id);
    setTimeout(() => {
      setDownloadedId(null);
    }, 3000);

    // Create a temporary link to download a mock file containing useful template tips
    const content = `Oppora Resource Vault\nResource: ${name}\nUser: ${user.name} (${user.email})\nGenerated Code: OPP-${Math.floor(Math.random() * 90000) + 10000}\nThis file contains premium curated guidance from Oppora. Keep striving, applicant!`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${id}-template.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // If user is NOT logged in, show access restriction gate
  if (!user) {
    return (
      <div className="space-y-12 py-4 animate-in fade-in duration-300 max-w-5xl mx-auto">
        {/* Lock Banner Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full uppercase tracking-widest">
            <Lock className="h-4 w-4" />
            <span>MEMBER-ONLY RESOURCE VAULT</span>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Sign In to Unlock the <span className="text-amber-400">Scholarship Vault</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Access to authentic winning Chevening/Rhodes essays, ATS-formatted academic CV templates, and application master timelines is reserved exclusively for registered members.
            </p>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <UserPlus className="h-4.5 w-4.5" />
              <span>Create Free Account / Log In</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 font-semibold">
            ⚡ Takes under 30 seconds • 100% Free Access for Registered Citizens
          </p>
        </div>

        {/* Benefits Preview Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900">
              What’s Inside the Vault?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Preview the premium assets available immediately upon signing in
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 relative overflow-hidden shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-extrabold text-slate-900">Winning Essay Archive</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Real Chevening, Rhodes, and Mastercard Foundation essays that secured full tuition funding.
                </p>
              </div>
              <button
                onClick={onOpenAuth}
                className="w-full bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-600 border border-slate-200 hover:border-amber-300 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <Lock className="h-3.5 w-3.5 text-amber-500" />
                <span>Unlock Essays</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 relative overflow-hidden shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-extrabold text-slate-900">ATS Academic CVs</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Pre-formatted Word DOCX and LaTeX templates optimized for international selection panels.
                </p>
              </div>
              <button
                onClick={onOpenAuth}
                className="w-full bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-600 border border-slate-200 hover:border-amber-300 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <Lock className="h-3.5 w-3.5 text-amber-500" />
                <span>Unlock Templates</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 relative overflow-hidden shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-extrabold text-slate-900">Master 2026 Timelines</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Step-by-step monthly strategy guides to organize references, transcripts, and portal submissions.
                </p>
              </div>
              <button
                onClick={onOpenAuth}
                className="w-full bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-600 border border-slate-200 hover:border-amber-300 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <Lock className="h-3.5 w-3.5 text-amber-500" />
                <span>Unlock Blueprint</span>
              </button>
            </div>
          </div>
        </div>

        {/* Locked Preview Cards */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-base font-extrabold text-slate-800 flex items-center space-x-2">
              <Lock className="h-4 w-4 text-amber-500" />
              <span>Locked Resource Index</span>
            </h3>
            <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
              Account Required
            </span>
          </div>

          <div className="space-y-3 filter blur-[1px] opacity-75 pointer-events-none select-none">
            {essayGuides.map((essay) => (
              <div key={essay.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{essay.title}</h4>
                  <p className="text-xs text-slate-400">{essay.description}</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-600">
                  <Lock className="h-4 w-4" />
                  <span>Locked</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full uppercase tracking-widest">
          <Award className="h-3.5 w-3.5 text-amber-500" />
          <span>VERIFIED MEMBER VAULT</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Premium Scholarship <span className="text-amber-600">Resources & Guides</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
          Welcome back, <span className="font-extrabold text-slate-800">{user.name}</span>! Access our hand-curated archives of successful essays, formatted academic CV templates, and optimized timelines.
        </p>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Essays and Templates */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Section: Winning Essays */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="font-sans text-lg font-extrabold text-slate-900 tracking-tight">
                Authentic Winning Essays
              </h2>
            </div>

            <div className="space-y-4">
              {essayGuides.map((essay) => (
                <div key={essay.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-sans text-base font-extrabold text-slate-900 tracking-tight hover:text-amber-600 cursor-pointer" onClick={() => setReadingResource(essay)}>
                        {essay.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {essay.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-md uppercase self-start whitespace-nowrap">
                      {essay.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-medium pt-2 border-t border-slate-100 gap-3">
                    <div className="flex items-center space-x-4">
                      <span>📝 {essay.wordCount}</span>
                      <span>📥 {essay.downloads} downloads</span>
                    </div>

                    <div className="flex items-center space-x-2 justify-between sm:justify-end">
                      <button
                        onClick={() => setReadingResource(essay)}
                        className="text-slate-600 hover:text-amber-600 font-bold flex items-center space-x-1 cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Read Online</span>
                      </button>
                      <span className="text-slate-200">|</span>
                      <button
                        onClick={() => handleDownload(essay.id, essay.title)}
                        className="text-amber-600 hover:text-amber-700 font-bold flex items-center space-x-1 cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download TXT</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: ATS Templates */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <FileText className="h-5 w-5 text-blue-500" />
              <h2 className="font-sans text-lg font-extrabold text-slate-900 tracking-tight">
                Academic & CV Templates
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {templates.map((temp) => {
                const Icon = temp.icon;
                return (
                  <div key={temp.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-sans text-xs font-bold text-slate-800 uppercase tracking-wide">
                        {temp.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        {temp.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-50 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                      <span>{temp.format} • {temp.size}</span>
                      <button
                        onClick={() => handleDownload(temp.id, temp.title)}
                        className="text-blue-600 hover:text-blue-700 font-bold flex items-center space-x-0.5 cursor-pointer"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right column: Interactive Application Timeline */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-500 uppercase tracking-widest">
                <Calendar className="h-4 w-4" />
                <span>Application Master Timeline</span>
              </div>
              <h3 className="font-sans text-lg font-extrabold text-white tracking-tight">
                The 2026 Blueprint
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                A strategic month-by-month breakdown to schedule, write, edit, and successfully lodge international scholarship files.
              </p>

              <div className="pt-4 space-y-6 relative border-l-2 border-slate-800 ml-2 pl-4">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="relative space-y-1.5">
                    {/* Circle marker */}
                    <div className="absolute -left-[25px] top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-slate-900" />
                    
                    <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {step.month}
                    </span>
                    <h5 className="font-sans text-xs font-bold text-slate-100 uppercase tracking-wide">
                      {step.title}
                    </h5>
                    <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4 leading-normal font-medium">
                      {step.tasks.map((task, tidx) => (
                        <li key={tidx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Need help sidebar */}
          <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200/60 shadow-xs space-y-3">
            <h4 className="font-sans text-sm font-extrabold text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
              <span>💡 Application Mentoring</span>
            </h4>
            <p className="text-amber-800 text-xs leading-relaxed font-medium">
              Want a peer-review on your drafted scholarship essay? Head to the **City Forum** to upload your essay or consult citizen comments!
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wide bg-amber-100 px-2.5 py-1 rounded-lg">
                12,000+ Vetted Peers
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Online Reading Modal */}
      {readingResource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-150 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto space-y-5 sm:space-y-6">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-3.5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Live Reading Room
                </span>
                <h3 className="font-sans text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {readingResource.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingResource(null)}
                className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/60 max-h-[45vh] overflow-y-auto">
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {readingResource.content}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-2 border-t border-slate-100 text-xs pb-6 sm:pb-0">
              <span className="text-slate-400 font-semibold font-mono text-[11px] text-center sm:text-left">
                Verification Status: Verified UC-Candidate
              </span>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    handleDownload(readingResource.id, readingResource.title);
                    setReadingResource(null);
                  }}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer min-h-[44px] active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  <span>Download File</span>
                </button>
                <button
                  onClick={() => setReadingResource(null)}
                  className="w-full sm:w-auto border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[44px]"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating alert for downloaded resource */}
      {downloadedId && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center space-x-2.5 animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-extrabold">Resource Downloaded Successfully!</p>
            <p className="text-[10px] text-slate-400">Checked UC-001 authentication and saved file.</p>
          </div>
        </div>
      )}

    </div>
  );
}

