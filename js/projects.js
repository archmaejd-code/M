/* ============================================================
   MAJED ABDULLAH — projects.js
   هذا هو الملف الوحيد الذي تحتاج تعديله لإضافة أو حذف مشروع.
   THIS IS THE ONLY FILE YOU EDIT TO ADD / REMOVE A PROJECT.

   لإضافة مشروع جديد / TO ADD A PROJECT:
   1) ضع الصور في مجلد جديد مثل:  images/project-07/cover.jpg
   2) انسخ أي كتلة { ... } بالأسفل والصقها في نهاية القائمة
   3) غيّر slug (اسم فريد بالإنجليزية بدون مسافات) والعنوان والصور
   ولا حاجة لإنشاء أي صفحة HTML — تُفتح تلقائياً عبر:
   projects/project.html?p=SLUG

   لحذف مشروع / TO REMOVE A PROJECT:
   احذف كتلته { ... } فقط من القائمة.
   الترقيم (01 / 02 ...) يُحسب تلقائياً.
   ============================================================ */

window.SITE = {
  name: "MAJED ABDULLAH",
  email: "Archmaejd@gmail.com",
  phone: "+966 50 552 2048",
  whatsapp: "https://wa.me/966505522048",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
};

window.PROJECTS = [
  {
    slug: "ESMAEEL VILLA",
    title: "ESMAEEL VILLA",
    category: "Residential",
    location: "Riyadh, Saudi Arabia",
    year: "2025",
    role: "Architectural Designer / Facade Design / 3D Visualization",
    firm: "MAJED ABDULLAH",
    images: ["images/project-01/01.jpg",  "images/project-01/02.jpg", "images/project-01/03.jpg", "images/project-01/04.jpg", "images/project-01/05.jpg", "images/project-01/06.jpg", "images/project-01/07.jpg", "images/project-01/08.jpg", "images/project-01/09.jpg"],
    description:
      "The residence begins with a carefully layered composition shaped around a central family garden. Set on a 600-square-meter site with an eastern frontage in Riyadh, the project organizes its spaces around this inner landscape, allowing the garden to become the visual and social heart of the home. Circulation follows a clear sequence between hospitality, family, and private domains, creating gradual transitions rather than rigid separations. Openings are positioned to frame the garden throughout the house, bringing natural light deep into the living spaces while maintaining a continuous connection between interior and landscape. A dedicated basement introduces an independent private domain for the son, extending the layered organization of the residence below ground. The project balances openness and privacy through its spatial hierarchy, creating a home where family interaction, individual autonomy, and the landscape coexist as one continuous experience.",
  },
  {
    slug: "MEZENE REST HOUSE",
    title: "MEZENE REST HOUSE",
    category: "Residential",
    location: "Riyadh, Saudi Arabia",
    year: "2026",
    role: "Facade Design / 3D Visualization",
    firm: "MAJED ABDULLAH",
    images: ["images/project-02/cover.jpg", "images/project-02/02.jpg", "images/project-02/03.jpg", "images/project-02/04.jpg", "images/project-02/05.jpg", "images/project-02/06.jpg", "images/project-02/07.jpg", "images/project-02/08.jpg", "images/project-02/09.jpg", "images/project-02/10.jpg"],
    description:
      "The project begins as a private retreat for dining and gathering, set on a 1,400-square-meter site in Al-Falah, Riyadh. Rather than treating the building as a single enclosed volume, the design unfolds across a sequence of shaded interiors, open terraces, and landscaped outdoor spaces, creating a gradual transition between architecture and the surrounding landscape. The main entrance establishes a clear arrival sequence from the front, leading guests into the heart of the retreat, while a separate rear entrance connects directly to the adjacent family villa. This discreet separation allows hospitality and family movement to coexist without overlap. Covered parking, outdoor seating, dining areas, and supporting service spaces are arranged as parts of one continuous experience. The composition is intentionally open and flexible, allowing the retreat to shift between intimate family gatherings and larger social occasions while maintaining a strong connection to the outdoors.",
  },
  {
    slug: "BAZAI VILLA",
    title: "BAZAI VILLA",
    category: "Residential",
    location: "Riyadh, Saudi Arabia",
    year: "2025",
    role: "Architectural Designer / Facade Design / 3D Visualization",
    firm: "MAJED ABDULLAH",
    images: ["images/project-03/cover.jpg", "images/project-03/02.jpg", "images/project-03/03.jpg", "images/project-03/04.jpg", "images/project-03/05.jpg", "images/project-03/06.jpg", "images/project-03/07.jpg", "images/project-03/08.jpg", "images/project-03/09.jpg", "images/project-03/10.jpg"],
    description:
      "The residence begins as a composition of layered volumes, shaped by the gradual transition between hospitality, family life, and private retreat. Set on a 600-square-meter site in Riyadh, the ground floor forms the social threshold of the home, where spaces for welcoming guests and everyday family life are carefully woven together while maintaining their distinct identities. The house then unfolds vertically. Below, the basement is carved into the ground to accommodate three vehicles and a recreational space, creating a quieter extension of the home away from the formal levels. Above, the first floor becomes a private sequence of six bedroom suites, supported by a dedicated laundry space and organized around the rhythms of daily family life. At the highest level, the master suite occupies a more secluded position, accompanied by a family lounge that opens toward the rooftop. Here, the architecture steps away from the enclosed interior and reconnects with the sky, creating an intimate setting for gathering, retreat, and relaxation. The vertical layering of the house establishes a gradual journey from the public realm to the most private spaces, allowing each level to carry its own character while remaining part of a continuous residential experience.",
  },
  {
    slug: "ZAMEL VILLA",
    title: "ZAMEL VILLA",
    category: "Residential",
    location: "Riyadh, Saudi Arabia",
    year: "2024",
    role: "Facade Design / 3D Visualization",
    firm: "MAJED ABDULLAH",
    images: ["images/project-04/cover.jpg", "images/project-04/01.jpg", "images/project-04/02.jpg", "images/project-04/03.jpg", "images/project-04/04.jpg", "images/project-04/05.jpg", "images/project-04/06.jpg"],
    description:
      "A contemporary interpretation of Najdi architecture, expressed through a monolithic sand-toned volume that balances solidity with refined simplicity. A recessed arched portal recalls the traditional Najdi gateway, while a patterned brick screen reinterprets the mashrabiya, filtering light and ventilation while preserving privacy. Deep overhangs, shaded verandas, rounded corners, and warm natural materials reinforce the principles of shade, privacy, and earthy materiality, creating a modern façade rooted in its regional identity.",
  },
  {
    slug: "DAHYAN TOWNHOUSE",
    title: "DAHYAN TOWNHOUSE",
    category: "Residential",
    location: "Riyadh, Saudi Arabia",
    year: "2025",
    role: "Architectural Designer / Facade Design / 3D Visualization",
    firm: "MAJED ABDULLAH",
    images: ["images/project-05/cover.jpg", "images/project-05/02.jpg", "images/project-05/03.jpg", "images/project-05/04.jpg", "images/project-05/05.jpg", "images/project-05/06.jpg", "images/project-05/07.jpg", "images/project-05/08.jpg", "images/project-05/09.jpg", "images/project-05/10.jpg"],
    description:
      "Conceived as a contemporary urban residential composition, the project transforms a compact site in Al Olaya into four distinct yet cohesive homes. Each residence is organized through a clear vertical hierarchy, separating private, family, hospitality, and service functions while maintaining a continuous sense of spatial connection. The design prioritizes privacy, flexibility, and efficient circulation, with each level offering a distinct residential experience—from intimate sleeping spaces to generous family and guest areas, complemented by outdoor extensions. Independent basements provide additional autonomy and adaptability, while the overall composition carefully balances individual privacy with the shared urban context. The result is a refined townhouse development that responds to the density of Al Olaya through clear organization, layered privacy, and contemporary residential character.",
  },
];
