/* ============================================================
   Grupo de Investigación — JS compartido
   - Menú móvil
   - Marcar enlace activo según la página
   - Animación de aparición (reveal)
   - Filtros de publicaciones
   - Galería (lightbox)
   - Envío de formulario (demo)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("abierto");
      var abierto = links.classList.contains("abierto");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("abierto");
    });
  }

  /* ---------- Enlace activo según nombre de archivo ---------- */
  var actual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(function (a) {
    var destino = a.getAttribute("href");
    if (destino === actual || (actual === "" && destino === "index.html")) {
      a.classList.add("activo");
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---------- Reveal al hacer scroll ---------- */
  var observables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && observables.length) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    observables.forEach(function (el) { io.observe(el); });
  } else {
    observables.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Filtros de publicaciones ---------- */
  var filtros = document.querySelectorAll(".filtro");
  var pubs = document.querySelectorAll(".pub[data-cat]");
  if (filtros.length && pubs.length) {
    filtros.forEach(function (b) {
      b.addEventListener("click", function () {
        filtros.forEach(function (x) { x.classList.remove("activo"); });
        b.classList.add("activo");
        var cat = b.getAttribute("data-filtro");
        pubs.forEach(function (p) {
          var mostrar = cat === "todas" || p.getAttribute("data-cat") === cat;
          p.classList.toggle("oculto", !mostrar);
        });
      });
    });
  }

  /* ---------- Galería / lightbox ---------- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector(".lightbox__img");
    var lbCap = lb.querySelector(".lightbox__cap");
    document.querySelectorAll(".galeria__item").forEach(function (item) {
      item.addEventListener("click", function () {
        var icono = item.getAttribute("data-icono") || "🔬";
        var cap = item.getAttribute("data-cap") || "";
        var img = item.getAttribute("data-img");
        if (lbImg) {
          if (img) {
            lbImg.innerHTML = '<img src="' + img + '" alt="' + cap.replace(/"/g, "&quot;") + '">';
          } else {
            lbImg.textContent = icono;
          }
        }
        if (lbCap) lbCap.textContent = cap;
        lb.classList.add("abierto");
      });
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("lightbox__cerrar")) {
        lb.classList.remove("abierto");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") lb.classList.remove("abierto");
    });
  }

  /* ---------- Formulario de contacto (demo) ---------- */
  var form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var aviso = form.querySelector(".form__aviso");
      if (aviso) {
        aviso.textContent = "¡Gracias! Hemos recibido tu mensaje. (Formulario de demostración: conéctalo a tu servicio de correo).";
        aviso.style.color = "#12864a";
      }
      form.reset();
    });
  }

  /* ---------- Año automático en el pie ---------- */
  document.querySelectorAll("[data-anio]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Idioma ES / EN ---------- */
  var I18N = {
    en: {
      // Navegación
      "nav.inicio": "Home",
      "nav.lineas": "Research lines",
      "nav.integrantes": "Members",
      "nav.publicaciones": "Publications",
      "nav.proyectos": "Projects",
      "nav.infraestructura": "Facilities",
      "nav.formacion": "Education",
      "nav.noticias": "News",
      "nav.recursos": "Resources",
      "nav.galeria": "Gallery",
      "nav.contacto": "Contact",
      // Pie
      "footer.desc": "Research in condensed matter, quantum materials and nanotechnology. University of Panama.",
      "footer.explora": "Explore",
      "footer.lineas": "Research lines",
      "footer.recursos": "Resources",
      "footer.recursosabiertos": "Open resources",
      "footer.formulario": "Contact form",
      "footer.derechos": "All rights reserved.",
      "footer.hecho": "Made with scientific dedication",
      // Hero
      "hero.badge": "Condensed matter · Quantum materials",
      "hero.h1": "Exploring microscopic physics from gas- to solid-state phases: attosecond science applied to condensed matter physics",
      "hero.p": "We are a research group devoted to understanding and designing the properties of solids: from semiconductors and nanomaterials to quantum materials with applications in energy, electronics and computing.",
      "hero.btn1": "View research lines",
      "hero.btn2": "Join the group",
      "hero.legend": "University of Panama",
      // Director del grupo
      "director.eyebrow": "Group leadership",
      "director.titulo": "Welcome to the website of the Quantum Optics and Condensed Matter Physics group, led by Prof. Dr. Alexis Chacón",
      "director.p1": "From the University of Panama we work on a wide range of topics in theoretical physics: from quantum optics and the interaction of matter with ultra-intense, ultra-short laser pulses — attosecond physics — to condensed matter and solid-state physics.",
      "director.p2": "Our research spans the ultrafast dynamics of electrons in atoms, molecules and solids; high-order harmonic generation as a spectroscopic probe of electronic structure; and the study of semiconductors and quantum materials — topological insulators, Dirac and Weyl semimetals, transition-metal dichalcogenides and Kagome lattices — combining analytical theory with high-performance computational simulation.",
      "director.cargo": "QOMP group leader · University of Panama",
      // Acerca
      "acerca.eyebrow": "About the group",
      "acerca.titulo": "The science of materials that sustain the future",
      "acerca.p1": "The Quantum Optics and Condensed Matter Physics (QOMP) group brings together researchers around the experimental and theoretical study of condensed matter. We combine materials synthesis, advanced characterization and computational modeling to answer fundamental questions while developing technologies with real impact.",
      "acerca.p2": "[EDIT: group history, founding year, institutional affiliation, national and international collaborations and areas of excellence.]",
      "acerca.btn1": "Meet the team",
      "acerca.btn2": "Our output",
      "acerca.stat1": "Years of activity",
      "acerca.stat2": "Published articles",
      "acerca.stat3": "Active members",
      "acerca.stat4": "Funded projects",
      // Misión / Visión / Valores
      "mvv.eyebrow": "Our identity",
      "mvv.titulo": "Mission, vision and values",
      "mvv.intro": "We are a small group, yet highly motivated to tackle ambitious projects in the physics of the microscopic world: quantum physics applied to optical phenomena and to condensed matter, from solids to semiconductors.",
      "mvv.mision.h": "Mission",
      "mvv.mision.p": "To study, control and characterize quantum materials with the tools of attosecond physics, and to propose new materials of this kind: those exhibiting the quantum Hall, quantum spin Hall or quantum anomalous Hall effects, among others. We focus on ultrafast electron dynamics and high-order harmonic generation in transition-metal dichalcogenides (MoS₂, WSe₂), topological insulators (Bi₂Se₃), graphene, Dirac, Weyl and multi-Weyl semimetals, Kagome lattices and materials with strong spin–orbit coupling, driven by terahertz and mid-infrared lasers.",
      "mvv.vision.h": "Vision",
      "mvv.vision.p": "To promote attosecond physics as a tool for the study of quantum materials and condensed matter at large: predicting new materials, optically controlling conductor–insulator phase transitions and manipulating spin currents, among other goals.",
      "mvv.valores.h": "Values",
      "mvv.v1": "Respect",
      "mvv.v2": "Responsibility",
      "mvv.v3": "Commitment",
      "mvv.v4": "Equity",
      "mvv.v5": "Excellence",
      "mvv.v6": "Integrity",
      "mvv.v7": "Diligence",
      "mvv.v8": "Tolerance",
      "mvv.v9": "Transparency",
      // Explora
      "explora.eyebrow": "Explore",
      "explora.titulo": "Discover our work",
      "explora.c1.t": "Research lines",
      "explora.c1.d": "The topics and questions that drive our science.",
      "explora.c1.l": "View lines →",
      "explora.c2.t": "Members",
      "explora.c2.d": "Researchers, postdocs and students in the group.",
      "explora.c2.l": "Meet the team →",
      "explora.c3.t": "Publications",
      "explora.c3.d": "Articles, chapters and scientific contributions.",
      "explora.c3.l": "Explore →",
      "explora.c4.t": "Projects",
      "explora.c4.d": "Funded research projects, active and completed.",
      "explora.c4.l": "View projects →",
      "explora.c5.t": "Facilities",
      "explora.c5.d": "Laboratories, equipment and characterization capabilities.",
      "explora.c5.l": "View equipment →",
      "explora.c6.t": "Education",
      "explora.c6.d": "Theses, courses and opportunities for students.",
      "explora.c6.l": "Study with us →",
      // CTA
      "cta.h": "Interested in doing research with us?",
      "cta.p": "We are looking for undergraduate, master's and doctoral students curious about materials physics. We also collaborate with industry and other academic groups.",
      "cta.btn": "Contact us",

      // ================= Páginas interiores =================
      // --- Líneas ---
      "lin.miga": "Research lines",
      "lin.h1": "Research lines",
      "lin.intro": "The major themes that shape our science, from fundamental questions to technological applications.",
      "lin.intro-edit": "[EDIT with your actual research lines]",
      "lin.card1-title": "Semiconductors and optoelectronics",
      "lin.card1-text": "Study of semiconductor materials and heterostructures for electronic devices, solar cells and light emitters. Band engineering, doping and charge transport.",
      "lin.card2-title": "Magnetism and spintronics",
      "lin.card2-text": "Magnetic materials, spin order and coupling phenomena for the next generation of memories and low-power devices.",
      "lin.card3-title": "Superconductivity and quantum materials",
      "lin.card3-text": "Search for and characterization of superconductors and correlated quantum states. Low-temperature physics and topological phases.",
      "lin.card4-title": "Nanomaterials and 2D materials",
      "lin.card4-text": "Graphene, dichalcogenides and low-dimensional structures. Synthesis, emergent properties and nanoscale applications.",
      "lin.card5-title": "Photonics and optical materials",
      "lin.card5-text": "Light–matter interaction, photonic materials and applications in sensors, communications and energy conversion.",
      "lin.card6-title": "Simulation and computational physics",
      "lin.card6-text": "First-principles calculations (DFT), molecular dynamics and modeling of electronic properties to predict and design new materials.",
      "lin.cta-title": "Looking for a thesis topic?",
      "lin.cta-text": "Each research line offers open projects for students. Write to us and we will guide you according to your interests.",
      "lin.cta-btn": "See training opportunities",
      // --- Integrantes ---
      "int.miga": "Members",
      "int.h1": "Members",
      "int.intro": "The people behind our research: individuals from diverse backgrounds united by scientific curiosity.",
      "int.eyebrow_lead": "Group leadership",
      "int.h2_lead": "Researchers",
      "int.role_pi": "Principal investigator · Group leader",
      "int.area_chacon": "Attosecond physics · Quantum materials · High-order harmonic generation",
      "int.role_researcher": "Researcher",
      "int.area_guerra": "Organic and perovskite solar cells · Graphene · Instrumentation",
      "int.area_correa": "Atmospheric physics · Experimental physics and instrumentation",
      "int.area_santamaria": "Materials physics · Photovoltaic solar energy · Instrumentation",
      "int.eyebrow_training": "Early-career research",
      "int.h2_members": "Group members",
      "int.members_intro": "Students and alumni.",
      "int.role_student": "B.Sc. student in Physics",
      "int.area_menotti": "Helicity control in high-order harmonics",
      "int.area_gonzalez": "High-harmonic spectroscopy of multi-Weyl semimetals",
      "int.role_alumna": "Graduate · B.Sc. in Physics",
      "int.role_alumno": "Graduate · B.Sc. in Physics",
      "int.area_vargas": "High-order harmonic generation in the Weyl semimetal TaAs",
      "int.area_lorenzo": "High-order harmonic spectroscopy of topological Kagome materials",
      "int.area_batista": "Controlling the helicity of high-order harmonics with delayed orthogonal pulses",
      // --- Publicaciones ---
      "pub.miga": "Publications",
      "pub.hero_h1": "Publications",
      "pub.hero_intro": "The group's scientific output in indexed journals, books and open-access repositories. Every reference links to its DOI or its arXiv version. Filter by type of contribution.",
      "pub.stat_papers": "Publications",
      "pub.stat_cites": "Total citations",
      "pub.stat_hindex": "h-index",
      "pub.stat_avg": "Citations per paper",
      "pub.scholar_intro": "Bibliometric indicators for Prof. Alexis A. Chacón Salazar according to",
      "pub.filter_all": "All",
      "pub.filter_articles": "Articles",
      "pub.filter_chapters": "Chapters and books",
      "pub.filter_preprints": "Preprints",
      // Etiquetas de metadatos
      "pub.m_preprint": "Preprint",
      "pub.m_submitted": "submitted to",
      "pub.m_deposited": "Deposited on",
      "pub.m_published": "Published on",
      "pub.m_online": "Online on",
      "pub.m_issue": "issue of",
      "pub.m_nobel": "Co-authored with F. Krausz, Nobel Prize in Physics 2023.",
      "pub.m_editor": "editor",
      "pub.m_forthcoming": "Volume in editorial preparation",
      "pub.m_in": "In:",
      "pub.m_chapter": "ch.",
      // Etiquetas temáticas
      "pub.tag_article": "Article",
      "pub.tag_preprint": "Preprint",
      "pub.tag_chapter": "Chapter",
      "pub.tag_book": "Book",
      "pub.tag_hhg": "High-harmonic generation",
      "pub.tag_solids": "Solids",
      "pub.tag_topological": "Topological materials",
      "pub.tag_2d": "2D materials",
      "pub.tag_attosecond": "Attosecond",
      "pub.tag_theory": "Theory",
      "pub.tag_experiment": "Experiment",
      "pub.tag_review": "Review",
      "pub.tag_strongfield": "Strong fields",
      "pub.tag_ionization": "Ionization",
      "pub.tag_molecules": "Molecules",
      "pub.tag_plasmonics": "Plasmonics",
      "pub.tag_ultrafast": "Ultrafast optics",
      "pub.tag_manybody": "Many-body",
      "pub.tag_nanostructures": "Nanostructures",
      "pub.tag_spintronics": "Spintronics",
      "pub.tag_quantumoptics": "Quantum optics",
      "pub.tag_outreach": "Outreach",
      "pub.note_source": "Source: curriculum vitae of Prof. Alexis A. Chacón Salazar (July 2026), with metadata verified against Crossref and arXiv. Preprints are listed separately because they are still undergoing peer review.",
      // --- Proyectos ---
      "pro.miga": "Projects",
      "pro.hero_h1": "Research projects",
      "pro.hero_intro": "The funded projects that support our science, with their funding entities and periods.",
      "pro.hero_edit": "[EDIT with your real projects]",
      "pro.active_eyebrow": "Ongoing",
      "pro.active_h": "Active projects",
      "pro.p1_title": "Quantum materials for computing",
      "pro.status_active": "Active",
      "pro.p1_desc": "Design and characterization of topological materials with potential in quantum technologies. Funded by [entity], code [000000].",
      "pro.edit": "[EDIT]",
      "pro.p2_title": "Semiconductors for solar energy",
      "pro.p2_desc": "Development of new absorber layers for high-efficiency photovoltaic cells. Funded by [entity].",
      "pro.p3_title": "Collaboration with industry",
      "pro.p3_desc": "Technology transfer in functional coatings for the [industry] sector.",
      "pro.done_eyebrow": "History",
      "pro.done_h": "Completed projects",
      "pro.p4_title": "Magnetism in complex oxides",
      "pro.status_done": "Completed",
      "pro.p4_desc": "Study of magnetic order in transition metal oxides. Resulted in [no.] publications.",
      "pro.p5_title": "Nanomaterials for sensors",
      "pro.p5_desc": "Fabrication of sensors based on low-dimensional materials.",
      "pro.p6_title": "Simulation of electronic properties",
      "pro.p6_desc": "First-principles methods applied to materials design.",
      "pro.cta_h": "Collaborations and funding?",
      "pro.cta_p": "We are open to new academic and industrial collaborations and to co-applying for projects.",
      "pro.cta_btn": "Propose a collaboration",
      // --- Infraestructura ---
      "inf.miga": "Facilities",
      "inf.h1": "Facilities & equipment",
      "inf.intro": "Our synthesis, characterization and simulation capabilities for the study of condensed matter.",
      "inf.intro-editar": "[EDIT with your actual equipment]",
      "inf.sintesis-titulo": "Materials synthesis",
      "inf.sintesis-1": "Crystal growth furnace",
      "inf.sintesis-2": "Thin-film deposition system",
      "inf.sintesis-3": "Inert-atmosphere glovebox",
      "inf.sintesis-4": "Mechanical milling and pressing",
      "inf.estructural-titulo": "Structural characterization",
      "inf.estructural-1": "X-ray diffractometer (XRD)",
      "inf.estructural-2": "Electron microscopy (SEM/TEM)",
      "inf.estructural-3": "Atomic force microscopy (AFM)",
      "inf.estructural-4": "Raman spectroscopy",
      "inf.propiedades-titulo": "Property characterization",
      "inf.propiedades-1": "Electrical transport measurements",
      "inf.propiedades-2": "Magnetometry (VSM / SQUID)",
      "inf.propiedades-3": "Low-temperature cryostat",
      "inf.propiedades-4": "Optical / UV-Vis spectroscopy",
      "inf.computo-titulo": "Scientific computing",
      "inf.computo-1": "High-performance computing cluster",
      "inf.computo-2": "DFT software (VASP, Quantum ESPRESSO)",
      "inf.computo-3": "Molecular dynamics",
      "inf.computo-4": "GPU workstations",
      "inf.extremas-titulo": "Extreme conditions",
      "inf.extremas-1": "Cryogenic systems (liquid He)",
      "inf.extremas-2": "Intense magnetic fields",
      "inf.extremas-3": "High / low pressure control",
      "inf.compartida-titulo": "Shared infrastructure",
      "inf.compartida-1": "Synchrotron access (collaboration)",
      "inf.compartida-2": "Central institutional services",
      "inf.compartida-3": "Network of associated laboratories",
      "inf.nota-editar": "[EDIT: add photos of the equipment in the Gallery and specify brands/models and availability for external services.]",
      // --- Formación ---
      "fom.miga": "Education",
      "fom.h1": "Education and teaching",
      "fom.intro": "We train the next generation of materials physicists. Here you will find opportunities for theses, courses and research stays.",
      "fom.intro_edit": "[EDIT]",
      "fom.niveles_eyebrow": "Levels",
      "fom.niveles_titulo": "Opportunities for students",
      "fom.lic_titulo": "Undergraduate",
      "fom.lic_desc": "Community service projects, internships and undergraduate theses on experimental and computational topics.",
      "fom.maes_titulo": "Master's",
      "fom.maes_desc": "Master's theses with access to advanced equipment and participation in funded projects.",
      "fom.doc_titulo": "Doctorate",
      "fom.doc_desc": "Cutting-edge doctoral research, with publications, international collaborations and research stays.",
      "fom.docencia_eyebrow": "Teaching",
      "fom.docencia_titulo": "Courses and seminars",
      "fom.curso_estado_solido": "Solid State Physics I and II",
      "fom.curso_semiconductores": "Semiconductor Physics",
      "fom.curso_caracterizacion": "Materials Characterization Methods",
      "fom.curso_primeros_principios": "Introduction to First-Principles Calculations",
      "fom.curso_seminario": "Weekly group seminar (open)",
      "fom.requisitos_eyebrow": "Requirements",
      "fom.requisitos_titulo": "How to join?",
      "fom.req_interes": "Genuine interest in materials physics",
      "fom.req_base": "Solid foundation in physics / chemistry / engineering",
      "fom.req_equipo": "Willingness to work as a team and learn",
      "fom.req_experiencia": "Prior laboratory experience is not required",
      "fom.req_boton": "Tell us about your interest",
      "fom.tesis_titulo": "Supervised theses and alumni",
      "fom.tesis_desc": "Over the years we have supervised dozens of theses. Our graduates work in academia and industry.",
      "fom.tesis_edit": "[EDIT: add a list of theses and the destinations of graduates.]",
      "fom.tesis_boton": "See the group's output",
      // --- Noticias ---
      "not.miga": "News",
      "not.h1": "News and updates",
      "not.intro": "Awards, new publications, new members and group events.",
      "not.intro_edit": "[EDIT with your real news]",
      "not.n1_title": "SNI recognition: National Researcher, Category II",
      "not.n1_sum": "Prof. Dr. Alexis Chacón has been awarded the Category II National Researcher distinction by Panama's National Research System (SNI–SENACYT), in recognition of his scientific career in the theoretical physics of ultrafast spectroscopy: the study, control and characterization of gases and solid-state matter through light–matter interaction.",
      "not.n1_link": "Meet the researcher →",
      "not.n2_title": "New publication in Physical Review B",
      "not.n2_edit": "[EDIT]",
      "not.n2_sum": "We present results on electronic transport in low-dimensional materials.",
      "not.n2_link": "View publication →",
      "not.n3_title": "Participation in an international conference",
      "not.n3_edit": "[EDIT]",
      "not.n3_sum": "The group presented three contributions at the condensed matter conference.",
      "not.n3_link": "Read more →",
      "not.n4_title": "New collaboration agreement",
      "not.n4_edit": "[EDIT]",
      "not.n4_sum": "We signed an agreement with an international research center to study superconductors.",
      "not.n4_link": "Read more →",
      "not.n5_title": "New group members",
      "not.n5_edit": "[EDIT]",
      "not.n5_sum": "We welcome new master's students and a postdoctoral researcher.",
      "not.n5_link": "Meet them →",
      "not.n6_title": "New characterization equipment",
      "not.n6_edit": "[EDIT]",
      "not.n6_sum": "We expanded our infrastructure with a low-temperature measurement system.",
      "not.n6_link": "View infrastructure →",
      // --- Recursos ---
      "rec.miga": "Resources",
      "rec.h1": "Open resources",
      "rec.intro": "We share data, software, outreach material, and useful links in the spirit of open science.",
      "rec.intro_editar": "[EDIT]",
      "rec.card_datos_t": "Datasets",
      "rec.card_datos_d": "Experimental and simulation data associated with our publications, in open repositories.",
      "rec.card_datos_l": "View data →",
      "rec.card_software_t": "Software and code",
      "rec.card_software_d": "Analysis scripts and computational tools developed by the group (GitHub / Zenodo).",
      "rec.card_software_l": "View repository →",
      "rec.card_divulgativo_t": "Outreach material",
      "rec.card_divulgativo_d": "Talks, infographics, and outreach texts on materials physics for a general audience.",
      "rec.card_divulgativo_l": "Explore →",
      "rec.card_seminarios_t": "Recorded seminars",
      "rec.card_seminarios_d": "Videos of our seminars and conferences open to the public.",
      "rec.card_seminarios_l": "Watch videos →",
      "rec.card_enlaces_t": "Links of interest",
      "rec.card_enlaces_d": "Materials databases, scientific societies, and recommended educational resources.",
      "rec.card_enlaces_l": "Go to links →",
      "rec.card_publicaciones_t": "Publications",
      "rec.card_publicaciones_d": "Access our articles, many available in open access.",
      "rec.card_publicaciones_l": "View publications →",
      "rec.nota_editar": "[EDIT: replace the \"#\" links with your real repositories (GitHub, Zenodo, OSF, YouTube channel, etc.).]",
      // --- Galería ---
      "gal.miga": "Gallery",
      "gal.h1": "Gallery",
      "gal.intro": "A glimpse of our laboratory, experiments, samples and the life of the group. Click on each image. ",
      "gal.intro_edit": "[EDIT with real photos]",
      "gal.cap_campus": "University campus",
      "gal.cap_muestras": "Sample characterization",
      "gal.cap_cristal": "Crystal growth",
      "gal.cap_sintesis": "Materials synthesis",
      "gal.cap_criogenia": "Cryogenics",
      "gal.cap_simulacion": "Computational simulation",
      "gal.cap_equipo": "Our team",
      "gal.cap_congresos": "Conferences",
      "gal.cap_resultados": "Results",
      "gal.cap_colaboraciones": "Collaborations",
      "gal.editnote_a": "[EDIT: place your photos in ",
      "gal.editnote_b": " and replace each ",
      "gal.editnote_c": " with <img src=\"assets/img/foto.jpg\" alt=\"...\">.]",
      // --- Contacto ---
      "con.miga": "Contact",
      "con.h1": "Contact",
      "con.intro": "Want to collaborate, do a thesis, or learn more about our work? Write to us.",
      "con.intro_edit": "[EDIT with your real details]",
      "con.eyebrow_donde": "Where to find us",
      "con.info_titulo": "Contact information",
      "con.label_direccion": "Address",
      "con.direccion_edit": "[EDIT]",
      "con.label_correo": "Email",
      "con.label_telefono": "Phone",
      "con.telefono_edit": "[EDIT]",
      "con.label_horario": "Hours",
      "con.horario_valor": "Monday to Friday, 9:00 – 18:00",
      "con.label_redes": "Networks / profiles",
      "con.mapa_edit": "🗺️ [EDIT: embed a Google Maps map here with <iframe>]",
      "con.eyebrow_escribenos": "Write to us",
      "con.form_titulo": "Contact form",
      "con.label_nombre": "Full name",
      "con.label_email": "Email address",
      "con.label_motivo": "Reason",
      "con.opt_tesis": "Interest in a thesis / research stay",
      "con.opt_colaboracion": "Collaboration proposal",
      "con.opt_prensa": "Press / outreach",
      "con.opt_otro": "Other",
      "con.label_mensaje": "Message",
      "con.enviar": "Send message",
      "con.demo_aviso": "[EDIT: the form is a demonstration. Connect it to a service such as Formspree, Netlify Forms, or your own backend.]"
    }
  };
  var LANG_KEY = "qomp_lang";
  var MESES = {
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };
  /* Reescribe <time datetime="AAAA-MM-DD"> al idioma activo. */
  function localizarFechas(lang) {
    var meses = MESES[lang] || MESES.es;
    document.querySelectorAll("time[datetime]").forEach(function (t) {
      var p = t.getAttribute("datetime").split("-");
      if (p.length !== 3) return;
      var dia = parseInt(p[2], 10), mes = meses[parseInt(p[1], 10) - 1];
      if (!mes || isNaN(dia)) return;
      t.textContent = lang === "en" ? mes + " " + dia + ", " + p[0] : dia + " " + mes + " " + p[0];
    });
  }
  function getLang() {
    try { return localStorage.getItem(LANG_KEY) || "es"; } catch (e) { return "es"; }
  }
  function aplicarIdioma(lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.getAttribute("data-es-original") === null) {
        el.setAttribute("data-es-original", el.textContent);
      }
      var key = el.getAttribute("data-i18n");
      if (lang === "en" && I18N.en[key] !== undefined) {
        el.textContent = I18N.en[key];
      } else {
        el.textContent = el.getAttribute("data-es-original");
      }
    });
    localizarFechas(lang);
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.textContent = lang === "es" ? "EN" : "ES";
      b.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }
  document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      aplicarIdioma(getLang() === "es" ? "en" : "es");
    });
  });
  aplicarIdioma(getLang());
})();
