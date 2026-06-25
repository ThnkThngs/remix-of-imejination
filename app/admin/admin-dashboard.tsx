"use client";

import { useEffect, useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  adminStorageKey,
  cloneState,
  collectTagPool,
  createId,
  dedupeTags,
  leadStatuses,
  portfolioCategories,
  seedState,
  suggestTags,
  type AdminState,
  type Lead,
  type LeadStatus,
  type PortfolioCategory,
  type PortfolioImage,
  type PortfolioItem,
} from "@/lib/admin-data";
import { generateUploadVariants } from "@/lib/image-tools";

type AdminTab = "leads" | "portfolio";
type PortfolioMode = "edit" | "new";

const kualaLumpurFormatter = new Intl.DateTimeFormat("en-MY", {
  dateStyle: "medium",
  timeStyle: "short",
  hour12: false,
  timeZone: "Asia/Kuala_Lumpur",
});

function formatTimestamp(value: string) {
  return kualaLumpurFormatter.format(new Date(value));
}

function formatDateOnly(value: string) {
  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeZone: "Asia/Kuala_Lumpur",
  }).format(new Date(value));
}

function leadStatusTone(status: LeadStatus) {
  switch (status) {
    case "New":
      return "lead-status new";
    case "Contacted":
      return "lead-status contacted";
    case "Quoted":
      return "lead-status quoted";
    case "Won":
      return "lead-status won";
    case "Archived":
      return "lead-status archived";
    default:
      return "lead-status";
  }
}

function createEmptyPortfolioDraft(order: number): PortfolioItem {
  return {
    id: createId("item"),
    title: "",
    category: "Property",
    description: "",
    tags: [],
    featured: false,
    order,
    images: [],
    updatedAt: new Date().toISOString(),
  };
}

function clonePortfolioItem(item: PortfolioItem): PortfolioItem {
  return {
    ...item,
    tags: [...item.tags],
    images: item.images.map((image) => ({ ...image })),
  };
}

function moveItemToFront<T>(items: T[], index: number) {
  if (index <= 0 || index >= items.length) {
    return items;
  }

  const next = [...items];
  const [selected] = next.splice(index, 1);
  next.unshift(selected);
  return next;
}

function buildPortfolioPreview(item: PortfolioItem) {
  const cover = item.images[0];
  return {
    coverUrl: cover?.thumbnailUrl ?? cover?.previewUrl ?? "",
    coverAlt: cover?.alt ?? item.title,
    imageCount: item.images.length,
  };
}

function AdminIcon({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

function PlusIcon() {
  return (
    <AdminIcon label="Add">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </AdminIcon>
  );
}

function UploadIcon() {
  return (
    <AdminIcon label="Upload">
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </AdminIcon>
  );
}

function SearchIcon() {
  return (
    <AdminIcon label="Search">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.5-3.5" />
    </AdminIcon>
  );
}

function TagIcon() {
  return (
    <AdminIcon label="Tag">
      <path d="M20 13.5 12.5 21 3 11.5V3h8.5L20 13.5Z" />
      <circle cx="8.5" cy="8.5" r="1.3" />
    </AdminIcon>
  );
}

function ImageIcon() {
  return (
    <AdminIcon label="Image">
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m7 15 3-3 3 3 3-4 3 4" />
      <circle cx="9" cy="9" r="1.3" />
    </AdminIcon>
  );
}

function ColumnsIcon() {
  return (
    <AdminIcon label="Kanban">
      <rect x="3" y="4" width="6" height="16" rx="1.6" />
      <rect x="10" y="4" width="6" height="16" rx="1.6" />
      <rect x="17" y="4" width="4" height="16" rx="1.6" />
    </AdminIcon>
  );
}

function ArrowLeftIcon() {
  return (
    <AdminIcon label="Previous">
      <path d="M14 6 8 12l6 6" />
      <path d="M8 12h12" />
    </AdminIcon>
  );
}

function ArrowRightIcon() {
  return (
    <AdminIcon label="Next">
      <path d="m10 6 6 6-6 6" />
      <path d="M4 12h12" />
    </AdminIcon>
  );
}

function PinIcon() {
  return (
    <AdminIcon label="Pin">
      <path d="m12 21-.5-7.2A5 5 0 0 1 7 9V6h10v3a5 5 0 0 1-4.5 4.8L12 21Z" />
      <path d="M9 6h6" />
    </AdminIcon>
  );
}

function MailIcon() {
  return (
    <AdminIcon label="Email">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </AdminIcon>
  );
}

function PhoneIcon() {
  return (
    <AdminIcon label="Phone">
      <path d="M8 4h3l2 5-2 1.5a14 14 0 0 0 5.5 5.5L18 14l5 2v3a2 2 0 0 1-2 2C10.4 21 3 13.6 3 4a2 2 0 0 1 2-2h3Z" />
    </AdminIcon>
  );
}

function MessageIcon() {
  return (
    <AdminIcon label="WhatsApp">
      <path d="M20 11.5A8.5 8.5 0 1 1 7 4.4" />
      <path d="m7 4 1.5 4.5L13 10l-2.2 2.2A10 10 0 0 0 18 20l2-2" />
    </AdminIcon>
  );
}

function MoveIcon() {
  return (
    <AdminIcon label="Move">
      <path d="m8 6-4 4 4 4" />
      <path d="M4 10h8" />
      <path d="m16 6 4 4-4 4" />
      <path d="M12 10h8" />
    </AdminIcon>
  );
}

function CheckIcon() {
  return (
    <AdminIcon label="Selected">
      <path d="m5 13 4 4 10-10" />
    </AdminIcon>
  );
}

export default function AdminDashboard() {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<AdminState>(() => cloneState(seedState));
  const [activeTab, setActiveTab] = useState<AdminTab>("leads");
  const [selectedLeadId, setSelectedLeadId] = useState(seedState.leads[0]?.id ?? "");
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(
    seedState.portfolioItems[0]?.id ?? ""
  );
  const [portfolioMode, setPortfolioMode] = useState<PortfolioMode>("edit");
  const [portfolioSearch, setPortfolioSearch] = useState("");
  const [portfolioCategory, setPortfolioCategory] = useState<string>("All");
  const [tagDraft, setTagDraft] = useState("");
  const [leadNoteDraft, setLeadNoteDraft] = useState("");
  const [leadDragId, setLeadDragId] = useState("");
  const [dragOverStatus, setDragOverStatus] = useState<LeadStatus | "">("");
  const [portfolioBusy, setPortfolioBusy] = useState(false);
  const [leadMessage, setLeadMessage] = useState("");
  const [portfolioMessage, setPortfolioMessage] = useState("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const kanbanBoardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(adminStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as AdminState;
        if (Array.isArray(parsed.leads) && Array.isArray(parsed.portfolioItems)) {
          setState(parsed);
          if (parsed.leads[0]) {
            setSelectedLeadId(parsed.leads[0].id);
          }
          if (parsed.portfolioItems[0]) {
            setSelectedPortfolioId(parsed.portfolioItems[0].id);
          }
        }
      }
    } catch {
      setState(cloneState(seedState));
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(adminStorageKey, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    if (!selectedLeadId && state.leads[0]) {
      setSelectedLeadId(state.leads[0].id);
    }
  }, [state.leads, selectedLeadId]);

  useEffect(() => {
    if (!selectedPortfolioId && state.portfolioItems[0]) {
      setSelectedPortfolioId(state.portfolioItems[0].id);
    }
  }, [selectedPortfolioId, state.portfolioItems]);

  useEffect(() => {
    if (activeTab === "leads" && kanbanBoardRef.current) {
      kanbanBoardRef.current.scrollLeft = 0;
    }
  }, [activeTab, state.leads.length]);

  const allTags = collectTagPool(state.portfolioItems);
  const selectedLead = state.leads.find((lead) => lead.id === selectedLeadId) ?? state.leads[0];
  const selectedPortfolio =
    state.portfolioItems.find((item) => item.id === selectedPortfolioId) ??
    state.portfolioItems[0] ??
    createEmptyPortfolioDraft((state.portfolioItems[state.portfolioItems.length - 1]?.order ?? 0) + 1);
  const visiblePortfolio = state.portfolioItems
    .filter((item) => {
      const matchesQuery =
        !portfolioSearch ||
        `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(
          portfolioSearch.toLowerCase()
        );
      const matchesCategory =
        portfolioCategory === "All" || item.category === (portfolioCategory as PortfolioCategory);
      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  const [portfolioDraft, setPortfolioDraft] = useState<PortfolioItem>(
    () => clonePortfolioItem(seedState.portfolioItems[0])
  );

  useEffect(() => {
    if (portfolioMode === "edit" && selectedPortfolio) {
      setPortfolioDraft(clonePortfolioItem(selectedPortfolio));
      setTagDraft("");
    }
  }, [portfolioMode, selectedPortfolio, selectedPortfolioId]);

  function resetSeedData() {
    const next = cloneState(seedState);
    setState(next);
    setActiveTab("leads");
    setSelectedLeadId(next.leads[0]?.id ?? "");
    setSelectedPortfolioId(next.portfolioItems[0]?.id ?? "");
    setPortfolioMode("edit");
    setPortfolioDraft(clonePortfolioItem(next.portfolioItems[0]));
    setPortfolioSearch("");
    setPortfolioCategory("All");
    setTagDraft("");
    setLeadNoteDraft("");
    setLeadMessage("");
    setPortfolioMessage("");
  }

  function selectLead(leadId: string) {
    setSelectedLeadId(leadId);
    setActiveTab("leads");
    setLeadNoteDraft("");
  }

  function moveLeadToStatus(leadId: string, nextStatus: LeadStatus) {
    const timestamp = new Date().toISOString();
    setState((current) => {
      const leads = current.leads.map((lead) => {
        if (lead.id !== leadId) {
          return lead;
        }

        if (lead.status === nextStatus) {
          return {
            ...lead,
            updatedAt: timestamp,
          };
        }

        return {
          ...lead,
          status: nextStatus,
          updatedAt: timestamp,
          statusTimeline: [...lead.statusTimeline, { status: nextStatus, at: timestamp }],
        };
      });

      return { ...current, leads };
    });
    setLeadMessage(`Moved to ${nextStatus} at ${formatTimestamp(timestamp)}.`);
  }

  async function handleLeadDrop(event: DragEvent<HTMLDivElement>, status: LeadStatus) {
    event.preventDefault();
    setDragOverStatus("");

    const leadId = event.dataTransfer.getData("text/plain") || leadDragId;
    if (!leadId) {
      return;
    }

    moveLeadToStatus(leadId, status);
  }

  function addLeadNote(leadId: string) {
    const note = leadNoteDraft.trim();
    if (!note) {
      return;
    }

    const timestamp = new Date().toISOString();
    setState((current) => ({
      ...current,
      leads: current.leads.map((lead) => {
        if (lead.id !== leadId) {
          return lead;
        }

        return {
          ...lead,
          updatedAt: timestamp,
          internalNotes: [
            ...lead.internalNotes,
            {
              id: createId("note"),
              text: note,
              createdAt: timestamp,
            },
          ],
        };
      }),
    }));
    setLeadNoteDraft("");
    setLeadMessage(`Internal note added at ${formatTimestamp(timestamp)}.`);
  }

  function startNewPortfolioItem() {
    const nextOrder = (state.portfolioItems[state.portfolioItems.length - 1]?.order ?? 0) + 1;
    const draft = createEmptyPortfolioDraft(nextOrder);
    setPortfolioDraft(draft);
    setSelectedPortfolioId(draft.id);
    setPortfolioMode("new");
    setActiveTab("portfolio");
    setTagDraft("");
    setPortfolioMessage("New portfolio draft ready.");
  }

  function selectPortfolioItem(item: PortfolioItem) {
    setSelectedPortfolioId(item.id);
    setPortfolioDraft(clonePortfolioItem(item));
    setPortfolioMode("edit");
    setActiveTab("portfolio");
    setTagDraft("");
  }

  function updatePortfolioField<K extends keyof PortfolioItem>(
    key: K,
    value: PortfolioItem[K]
  ) {
    setPortfolioDraft((current) => ({
      ...current,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  }

  function addPortfolioTag(tag: string) {
    const normalized = dedupeTags([tag])[0];
    if (!normalized) {
      return;
    }

    setPortfolioDraft((current) => {
      const tags = dedupeTags([...current.tags, normalized]);
      return {
        ...current,
        tags,
        updatedAt: new Date().toISOString(),
      };
    });
    setTagDraft("");
  }

  function removePortfolioTag(tag: string) {
    setPortfolioDraft((current) => ({
      ...current,
      tags: current.tags.filter((candidate) => candidate.toLowerCase() !== tag.toLowerCase()),
      updatedAt: new Date().toISOString(),
    }));
  }

  async function handleImageUpload(files: FileList | File[]) {
    const selectedFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!selectedFiles.length) {
      return;
    }

    setPortfolioBusy(true);

    try {
      const variants = await Promise.all(
        selectedFiles.map(async (file) => {
          const variant = await generateUploadVariants(file);
          const timestamp = new Date().toISOString();
          const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();

          return {
            id: createId("image"),
            fileName: file.name,
            alt: alt || "Uploaded portfolio image",
            previewUrl: variant.previewUrl,
            thumbnailUrl: variant.thumbnailUrl,
            width: variant.width,
            height: variant.height,
            mimeType: variant.mimeType,
            createdAt: timestamp,
          } satisfies PortfolioImage;
        })
      );

      setPortfolioDraft((current) => ({
        ...current,
        images: [...current.images, ...variants],
        updatedAt: new Date().toISOString(),
      }));
      setPortfolioMessage(`Generated ${variants.length} thumbnail${variants.length > 1 ? "s" : ""}.`);
    } finally {
      setPortfolioBusy(false);
    }
  }

  async function handleImageDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files.length) {
      return;
    }

    await handleImageUpload(files);
  }

  function removePortfolioImage(imageId: string) {
    setPortfolioDraft((current) => ({
      ...current,
      images: current.images.filter((image) => image.id !== imageId),
      updatedAt: new Date().toISOString(),
    }));
  }

  function promotePortfolioImage(imageId: string) {
    setPortfolioDraft((current) => {
      const index = current.images.findIndex((image) => image.id === imageId);
      if (index <= 0) {
        return current;
      }

      return {
        ...current,
        images: moveItemToFront(current.images, index),
        updatedAt: new Date().toISOString(),
      };
    });
  }

  function savePortfolioDraft() {
    const timestamp = new Date().toISOString();
    const nextItem: PortfolioItem = {
      ...portfolioDraft,
      title: portfolioDraft.title.trim(),
      description: portfolioDraft.description.trim(),
      tags: dedupeTags(portfolioDraft.tags),
      updatedAt: timestamp,
    };

    if (!nextItem.title) {
      setPortfolioMessage("Add a title before saving.");
      return;
    }

    setState((current) => {
      const existingIndex = current.portfolioItems.findIndex((item) => item.id === nextItem.id);
      const portfolioItems =
        existingIndex >= 0
          ? current.portfolioItems.map((item) => (item.id === nextItem.id ? nextItem : item))
          : [...current.portfolioItems, nextItem];

      return {
        ...current,
        portfolioItems: portfolioItems
          .map((item) => ({ ...item, order: item.order }))
          .sort((a, b) => a.order - b.order),
      };
    });

    setPortfolioMode("edit");
    setSelectedPortfolioId(nextItem.id);
    setPortfolioMessage(`Saved ${nextItem.title} at ${formatTimestamp(timestamp)}.`);
    setTagDraft("");
  }

  function addTagFromDraft() {
    const pieces = tagDraft.split(",").map((piece) => piece.trim());
    const next = dedupeTags([...portfolioDraft.tags, ...pieces]).filter(Boolean);
    if (!next.length) {
      return;
    }

    setPortfolioDraft((current) => ({
      ...current,
      tags: next,
      updatedAt: new Date().toISOString(),
    }));
    setTagDraft("");
  }

  function applySuggestedTag(tag: string) {
    addPortfolioTag(tag);
  }

  const selectedTagSuggestions = suggestTags(
    tagDraft,
    portfolioDraft.tags,
    allTags
  );

  return (
    <main className="admin-shell">
      <header className="admin-hero">
        <div className="admin-brand">
          <img
            src="/brand/imejination-stacked.png"
            alt="Imejination"
            className="admin-brand-mark"
          />
          <div className="admin-brand-copy">
            <p className="admin-eyebrow">Imejination Sdn Bhd</p>
            <h1>Operations board</h1>
            <p>
              Move leads through the pipeline, capture timestamps, and keep every
              portfolio item tagged, previewed, and upload-ready.
            </p>
          </div>
        </div>
        <div className="admin-toolbar">
          <button type="button" className="admin-button secondary" onClick={resetSeedData}>
            Reset demo
          </button>
          <button
            type="button"
            className="admin-button"
            onClick={startNewPortfolioItem}
          >
            <PlusIcon />
            New portfolio item
          </button>
        </div>
      </header>

      <nav className="admin-tabs" aria-label="Admin sections">
        <button
          type="button"
          className={activeTab === "leads" ? "admin-tab active" : "admin-tab"}
          onClick={() => setActiveTab("leads")}
        >
          <ColumnsIcon />
          Leads
        </button>
        <button
          type="button"
          className={activeTab === "portfolio" ? "admin-tab active" : "admin-tab"}
          onClick={() => setActiveTab("portfolio")}
        >
          <ImageIcon />
          Portfolio
        </button>
      </nav>

      <div className="admin-status-row" aria-live="polite">
        <span>{leadMessage || "Drag a lead card into a new column to update status timestamps."}</span>
        <span>{portfolioMessage || "Upload images to auto-generate thumbnails for the portfolio library."}</span>
      </div>

      {activeTab === "leads" ? (
        <section className="admin-layout leads-layout" aria-label="Lead board">
          <div className="admin-summary-grid">
            <MetricCard label="Open leads" value={state.leads.filter((lead) => lead.status !== "Won" && lead.status !== "Archived").length} />
            <MetricCard label="Won" value={state.leads.filter((lead) => lead.status === "Won").length} />
            <MetricCard label="Archived" value={state.leads.filter((lead) => lead.status === "Archived").length} />
            <MetricCard label="Updated" value={selectedLead ? formatTimestamp(selectedLead.updatedAt) : "No lead selected"} compact />
          </div>

          <div className="leads-board-shell">
            <div className="kanban-board" ref={kanbanBoardRef}>
              {leadStatuses.map((status) => {
                const leadsInStatus = state.leads.filter((lead) => lead.status === status);
                return (
                  <KanbanColumn
                    key={status}
                    status={status}
                    leads={leadsInStatus}
                    dragOver={dragOverStatus === status}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragOverStatus(status);
                    }}
                    onDrop={(event) => handleLeadDrop(event, status)}
                  >
                    {leadsInStatus.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        selected={lead.id === selectedLeadId}
                        onSelect={() => selectLead(lead.id)}
                        onDragStart={(event) => {
                          setLeadDragId(lead.id);
                          event.dataTransfer.effectAllowed = "move";
                          event.dataTransfer.setData("text/plain", lead.id);
                        }}
                        onDragEnd={() => {
                          setLeadDragId("");
                          setDragOverStatus("");
                        }}
                        onMoveBack={() => {
                          const currentIndex = leadStatuses.indexOf(lead.status);
                          if (currentIndex > 0) {
                            moveLeadToStatus(lead.id, leadStatuses[currentIndex - 1]);
                          }
                        }}
                        onMoveForward={() => {
                          const currentIndex = leadStatuses.indexOf(lead.status);
                          if (currentIndex < leadStatuses.length - 1) {
                            moveLeadToStatus(lead.id, leadStatuses[currentIndex + 1]);
                          }
                        }}
                        canMoveBack={leadStatuses.indexOf(lead.status) > 0}
                        canMoveForward={leadStatuses.indexOf(lead.status) < leadStatuses.length - 1}
                      />
                    ))}
                  </KanbanColumn>
                );
              })}
            </div>

            <aside className="lead-detail-panel" aria-label="Lead details">
              {selectedLead ? (
                <>
                  <div className="panel-header">
                    <div>
                      <p className="panel-kicker">Selected lead</p>
                      <h2>{selectedLead.projectName}</h2>
                      <p>{selectedLead.company}</p>
                    </div>
                    <span className={leadStatusTone(selectedLead.status)}>{selectedLead.status}</span>
                  </div>

                  <div className="lead-contact-grid">
                    <a href={`mailto:${selectedLead.email}`} className="contact-link">
                      <MailIcon />
                      <span>{selectedLead.email}</span>
                    </a>
                    <a href={`tel:${selectedLead.phone}`} className="contact-link">
                      <PhoneIcon />
                      <span>{selectedLead.phone}</span>
                    </a>
                    <span className="contact-link static">
                      <PinIcon />
                      <span>{selectedLead.location}</span>
                    </span>
                    <span className="contact-link static">
                      <MessageIcon />
                      <span>{selectedLead.preferredContact}</span>
                    </span>
                  </div>

                  <dl className="lead-facts">
                    <Fact term="Project type" value={selectedLead.projectType} />
                    <Fact term="Budget" value={selectedLead.budgetRange} />
                    <Fact term="Deadline" value={formatDateOnly(selectedLead.deadline)} />
                    <Fact term="Created" value={formatTimestamp(selectedLead.createdAt)} />
                    <Fact term="Updated" value={formatTimestamp(selectedLead.updatedAt)} />
                    <Fact
                      term="Current status since"
                      value={
                        selectedLead.statusTimeline[selectedLead.statusTimeline.length - 1]
                          ? formatTimestamp(
                              selectedLead.statusTimeline[selectedLead.statusTimeline.length - 1]!.at
                            )
                          : formatTimestamp(selectedLead.updatedAt)
                      }
                    />
                  </dl>

                  <section className="panel-block">
                    <h3>AI recommendation</h3>
                    <p>{selectedLead.aiRecommendation}</p>
                  </section>

                  <section className="panel-block">
                    <h3>Timeline</h3>
                    <ul className="timeline-list">
                      {selectedLead.statusTimeline.map((entry) => (
                        <li key={`${entry.status}-${entry.at}`}>
                          <strong>{entry.status}</strong>
                          <span>{formatTimestamp(entry.at)}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="panel-block">
                    <h3>Internal notes</h3>
                    <textarea
                      className="admin-input note-box"
                      value={leadNoteDraft}
                      onChange={(event) => setLeadNoteDraft(event.target.value)}
                      placeholder="Add context for the next follow-up, quote revision, or shoot prep note."
                      rows={4}
                    />
                    <div className="panel-actions">
                      <button
                        type="button"
                        className="admin-button secondary"
                        onClick={() => setLeadNoteDraft("")}
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        className="admin-button"
                        onClick={() => addLeadNote(selectedLead.id)}
                      >
                        <PlusIcon />
                        Save note
                      </button>
                    </div>
                    {selectedLead.internalNotes.length > 0 ? (
                      <ul className="note-list">
                        {selectedLead.internalNotes.map((note) => (
                          <li key={note.id}>
                            <p>{note.text}</p>
                            <span>{formatTimestamp(note.createdAt)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="empty-state">No internal notes yet.</p>
                    )}
                  </section>
                </>
              ) : (
                <p className="empty-state">Select a lead to view the timeline and notes.</p>
              )}
            </aside>
          </div>
        </section>
      ) : (
        <section className="admin-layout portfolio-layout" aria-label="Portfolio manager">
          <div className="portfolio-sidebar">
            <div className="portfolio-search">
              <div className="field-with-icon">
                <SearchIcon />
                <input
                  className="admin-input"
                  type="search"
                  placeholder="Search items, descriptions, or tags"
                  value={portfolioSearch}
                  onChange={(event) => setPortfolioSearch(event.target.value)}
                />
              </div>
              <div className="category-row">
                <FilterPill
                  active={portfolioCategory === "All"}
                  onClick={() => setPortfolioCategory("All")}
                >
                  All
                </FilterPill>
                {portfolioCategories.map((category) => (
                  <FilterPill
                    key={category}
                    active={portfolioCategory === category}
                    onClick={() => setPortfolioCategory(category)}
                  >
                    {category}
                  </FilterPill>
                ))}
              </div>
            </div>

            <div className="portfolio-list">
              {visiblePortfolio.map((item) => {
                const preview = buildPortfolioPreview(item);
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={item.id === selectedPortfolioId ? "portfolio-item active" : "portfolio-item"}
                    onClick={() => selectPortfolioItem(item)}
                  >
                    <img src={preview.coverUrl || "/screenshot.jpeg"} alt={preview.coverAlt} />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.category}</span>
                      <small>
                        {item.tags.join(" • ")}
                        {preview.imageCount > 1 ? ` • ${preview.imageCount} images` : " • 1 image"}
                      </small>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="portfolio-editor">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  {portfolioMode === "new" ? "New portfolio item" : "Edit portfolio item"}
                </p>
                <h2>{portfolioDraft.title || "Untitled item"}</h2>
                <p>
                  Upload image sets, keep tags clean, and let the generated thumbnails feed the library view.
                </p>
              </div>
              <span className="editor-badge">
                {portfolioDraft.images.length} image{portfolioDraft.images.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="editor-grid">
              <label className="field">
                <span>Title</span>
                <input
                  className="admin-input"
                  value={portfolioDraft.title}
                  onChange={(event) =>
                    updatePortfolioField("title", event.target.value)
                  }
                  placeholder="Township hero sequence"
                />
              </label>

              <label className="field">
                <span>Category</span>
                <select
                  className="admin-input"
                  value={portfolioDraft.category}
                  onChange={(event) =>
                    updatePortfolioField("category", event.target.value as PortfolioCategory)
                  }
                >
                  {portfolioCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field full-width">
                <span>Description</span>
                <textarea
                  className="admin-input"
                  rows={4}
                  value={portfolioDraft.description}
                  onChange={(event) =>
                    updatePortfolioField("description", event.target.value)
                  }
                  placeholder="Short summary of the visual set and the kind of client use it serves."
                />
              </label>

              <div className="field full-width">
                <span>Tags</span>
                <div className="tag-editor">
                  <div className="field-with-icon">
                    <TagIcon />
                    <input
                      className="admin-input"
                      value={tagDraft}
                      onChange={(event) => setTagDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === ",") {
                          event.preventDefault();
                          addTagFromDraft();
                        }
                      }}
                      placeholder="Add tags, separated by commas"
                    />
                  </div>
                  <button type="button" className="admin-button secondary" onClick={addTagFromDraft}>
                    <PlusIcon />
                    Add tag
                  </button>
                </div>

                <div className="tag-chip-row">
                  {portfolioDraft.tags.length > 0 ? (
                    portfolioDraft.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="tag-chip"
                        onClick={() => removePortfolioTag(tag)}
                        title="Remove tag"
                      >
                        {tag}
                        <span aria-hidden="true">×</span>
                      </button>
                    ))
                  ) : (
                    <span className="empty-state">No tags added yet.</span>
                  )}
                </div>

                <div className="tag-suggestions">
                  {selectedTagSuggestions.length > 0 ? (
                    selectedTagSuggestions.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="suggestion-chip"
                        onClick={() => applySuggestedTag(tag)}
                      >
                        {tag}
                      </button>
                    ))
                  ) : (
                    <span className="empty-state">No new tag suggestions match this draft.</span>
                  )}
                </div>
              </div>

              <label className="field full-width">
                <span>Featured</span>
                <button
                  type="button"
                  className={portfolioDraft.featured ? "toggle active" : "toggle"}
                  onClick={() =>
                    updatePortfolioField("featured", !portfolioDraft.featured)
                  }
                >
                  {portfolioDraft.featured ? <CheckIcon /> : null}
                  {portfolioDraft.featured ? "Featured in hero selections" : "Mark as featured"}
                </button>
              </label>
            </div>

            <div className="upload-panel" onDragOver={(event) => event.preventDefault()} onDrop={handleImageDrop}>
              <div className="upload-copy">
                <div>
                  <p className="panel-kicker">Portfolio images</p>
                  <h3>Drop images here or browse</h3>
                </div>
                <button
                  type="button"
                  className="admin-button secondary"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={portfolioBusy}
                >
                  <UploadIcon />
                  {portfolioBusy ? "Processing" : "Upload images"}
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={async (event) => {
                    const files = event.target.files;
                    if (files) {
                      await handleImageUpload(files);
                      event.target.value = "";
                    }
                  }}
                />
              </div>

              <div className="upload-grid">
                {portfolioDraft.images.map((image, index) => (
                  <article key={image.id} className="upload-card">
                    <img src={image.thumbnailUrl} alt={image.alt} />
                    <div className="upload-meta">
                      <strong>{image.fileName}</strong>
                      <span>
                        {image.width} x {image.height}
                      </span>
                    </div>
                    <div className="upload-actions">
                      <button type="button" onClick={() => promotePortfolioImage(image.id)}>
                        <MoveIcon />
                        Cover
                      </button>
                      <button type="button" onClick={() => removePortfolioImage(image.id)}>
                        Remove
                      </button>
                    </div>
                    {index === 0 ? <span className="cover-badge">Cover</span> : null}
                  </article>
                ))}
              </div>
            </div>

            <div className="panel-actions footer-actions">
              <button
                type="button"
                className="admin-button secondary"
                onClick={() => selectPortfolioItem(state.portfolioItems[0])}
              >
                Reset to first item
              </button>
              <button type="button" className="admin-button" onClick={savePortfolioDraft}>
                <PlusIcon />
                Save portfolio item
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function MetricCard({
  label,
  value,
  compact,
}: {
  label: string;
  value: number | string;
  compact?: boolean;
}) {
  return (
    <article className={compact ? "metric-card compact" : "metric-card"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function KanbanColumn({
  status,
  leads,
  dragOver,
  onDragOver,
  onDrop,
  children,
}: {
  status: LeadStatus;
  leads: Lead[];
  dragOver: boolean;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  children: ReactNode;
}) {
  return (
    <section
      className={dragOver ? "kanban-column drag-over" : "kanban-column"}
      onDragOver={onDragOver}
      onDrop={onDrop}
      data-status={status}
    >
      <header className="kanban-column-header">
        <div>
          <p>{status}</p>
          <span>{leads.length} lead{leads.length === 1 ? "" : "s"}</span>
        </div>
      </header>
      <div className="kanban-column-body">{children}</div>
    </section>
  );
}

function LeadCard({
  lead,
  selected,
  onSelect,
  onDragStart,
  onDragEnd,
  onMoveBack,
  onMoveForward,
  canMoveBack,
  canMoveForward,
}: {
  lead: Lead;
  selected: boolean;
  onSelect: () => void;
  onDragStart: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onMoveBack: () => void;
  onMoveForward: () => void;
  canMoveBack: boolean;
  canMoveForward: boolean;
}) {
  return (
    <article
      draggable
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={selected ? "lead-card selected" : "lead-card"}
    >
      <div className="lead-card-top">
        <span className={leadStatusTone(lead.status)}>{lead.status}</span>
        <strong>{lead.projectName}</strong>
        <p>{lead.company}</p>
      </div>

      <dl className="lead-card-facts">
        <div>
          <dt>Budget</dt>
          <dd>{lead.budgetRange}</dd>
        </div>
        <div>
          <dt>Deadline</dt>
          <dd>{formatDateOnly(lead.deadline)}</dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>{formatTimestamp(lead.updatedAt)}</dd>
        </div>
      </dl>

      <div className="lead-card-footer">
        <span>
          {lead.statusTimeline[lead.statusTimeline.length - 1]
            ? formatTimestamp(lead.statusTimeline[lead.statusTimeline.length - 1]!.at)
            : "No status timestamp"}
        </span>
        <div className="lead-card-actions">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              if (canMoveBack) {
                onMoveBack();
              }
            }}
            disabled={!canMoveBack}
            aria-label="Move lead back"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              if (canMoveForward) {
                onMoveForward();
              }
            }}
            disabled={!canMoveForward}
            aria-label="Move lead forward"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div className="fact">
      <dt>{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={active ? "filter-pill active" : "filter-pill"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
