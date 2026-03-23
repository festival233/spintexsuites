from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE_PATH = ROOT / "templates" / "programmatic-seo-template.html"

PAGES = [
    {"slug": "apartments-near-accra-mall", "target": "Accra Mall", "area": "Tetteh Quarshie", "intent": "shopping-friendly accommodation", "audience": "travelers who want premium stays close to major retail and dining"},
    {"slug": "stay-near-kotoka-airport", "target": "Kotoka International Airport", "area": "Airport City", "intent": "airport-access stay", "audience": "guests with early departures, late arrivals, or regional business flights"},
    {"slug": "studio-apartments-east-legon", "target": "East Legon", "area": "East Legon", "intent": "studio apartment stay", "audience": "professionals and social travelers who value upscale city energy"},
    {"slug": "short-stay-spintex-road", "target": "Spintex Road", "area": "Spintex Corridor", "intent": "short-stay apartment", "audience": "visitors who need quick access to central Accra and Tema routes"},
    {"slug": "apartments-near-labadi-beach", "target": "Labadi Beach", "area": "Labadi", "intent": "coastal leisure accommodation", "audience": "guests combining beach plans with premium city comfort"},
    {"slug": "business-travel-accommodation-accra", "target": "Accra business districts", "area": "Greater Accra", "intent": "business travel accommodation", "audience": "executives, consultants, and project teams"},
    {"slug": "expat-housing-accra", "target": "Accra expat neighborhoods", "area": "Accra", "intent": "expat-ready accommodation", "audience": "diaspora guests and relocating professionals"},
    {"slug": "short-stay-tema-motorway", "target": "Tema Motorway corridor", "area": "Motorway-East Accra access", "intent": "high-mobility short stay", "audience": "guests moving between Accra meetings and Tema operations"},
    {"slug": "serviced-apartments-airport-residential-accra", "target": "Airport Residential Area", "area": "Airport Residential", "intent": "serviced apartment stay", "audience": "travelers who prioritize polished surroundings and short commute times"},
    {"slug": "accommodation-near-osu-oxford-street", "target": "Osu Oxford Street", "area": "Osu", "intent": "lifestyle-focused accommodation", "audience": "guests who want dining, nightlife, and city culture"},
    {"slug": "apartments-near-trade-fair-accra", "target": "Ghana International Trade Fair Centre", "area": "La", "intent": "event-adjacent accommodation", "audience": "exhibitors, attendees, and business delegates"},
    {"slug": "furnished-studio-apartments-accra", "target": "central Accra access", "area": "Accra", "intent": "furnished studio apartment", "audience": "guests who want turnkey comfort without lease complexity"},
    {"slug": "family-friendly-apartments-spintex-accra", "target": "Spintex family routes", "area": "Spintex", "intent": "family-friendly accommodation", "audience": "small families and visiting relatives"},
    {"slug": "weekend-staycation-accra", "target": "Accra lifestyle zones", "area": "Accra", "intent": "weekend staycation", "audience": "residents and visitors planning premium weekend escapes"},
    {"slug": "executive-apartments-accra", "target": "Accra executive corridors", "area": "Accra", "intent": "executive apartment", "audience": "senior professionals with high standards for privacy and service"},
    {"slug": "accommodation-near-american-house-east-legon", "target": "American House, East Legon", "area": "East Legon", "intent": "landmark-based accommodation", "audience": "guests meeting clients or family around East Legon"},
    {"slug": "apartments-near-achimota-retail-centre", "target": "Achimota Retail Centre", "area": "Achimota", "intent": "retail-and-transit accommodation", "audience": "travelers balancing errands, business, and city access"},
    {"slug": "apartments-near-junction-mall-nungua", "target": "Junction Mall Nungua", "area": "Nungua-Spintex edge", "intent": "mall-access accommodation", "audience": "guests who want shopping convenience near Spintex"},
    {"slug": "stay-near-tema-port-access", "target": "Tema Port access roads", "area": "East Accra-Tema link", "intent": "port-linked accommodation", "audience": "shipping teams, contractors, and logistics managers"},
    {"slug": "medical-travel-accommodation-accra", "target": "Accra medical hubs", "area": "Accra", "intent": "medical travel accommodation", "audience": "patients, caregivers, and visiting specialists"},
    {"slug": "apartments-near-university-of-ghana-legon", "target": "University of Ghana, Legon", "area": "Legon", "intent": "university-adjacent stay", "audience": "academic visitors, parents, and conference guests"},
    {"slug": "stay-near-accra-conference-centre", "target": "Accra International Conference Centre", "area": "Ridge", "intent": "conference accommodation", "audience": "delegates and event attendees"},
    {"slug": "long-stay-suites-accra", "target": "Accra long-stay demand", "area": "Accra", "intent": "extended stay suite", "audience": "guests on projects, relocations, or recovery stays"},
    {"slug": "romantic-getaway-suite-accra", "target": "Accra leisure districts", "area": "Accra", "intent": "romantic getaway", "audience": "couples seeking private, luxury short breaks"},
    {"slug": "digital-nomad-accommodation-accra", "target": "Accra remote-work zones", "area": "Accra", "intent": "digital nomad stay", "audience": "remote professionals and founders"},
    {"slug": "apartments-near-labone-accra", "target": "Labone", "area": "Labone", "intent": "central neighborhood accommodation", "audience": "guests who want refined restaurants and embassies nearby"},
    {"slug": "stay-near-cantonments-accra", "target": "Cantonments", "area": "Cantonments", "intent": "premium neighborhood stay", "audience": "corporate guests and diplomatic visitors"},
    {"slug": "accommodation-near-marina-mall-airport-city", "target": "Marina Mall, Airport City", "area": "Airport City", "intent": "airport-city accommodation", "audience": "travelers who need close retail, dining, and flight access"},
    {"slug": "apartments-near-tesano-accra", "target": "Tesano", "area": "Tesano", "intent": "residential business stay", "audience": "consultants and families visiting west-central Accra"},
    {"slug": "stay-near-adenta-accra", "target": "Adenta", "area": "Adenta corridor", "intent": "suburban-connected accommodation", "audience": "guests who prefer calmer bases with city reach"},
    {"slug": "concert-weekend-accommodation-accra", "target": "Accra event venues", "area": "Accra", "intent": "event weekend stay", "audience": "music and festival travelers needing safe premium lodging"},
    {"slug": "diaspora-home-base-accra", "target": "Accra diaspora travel routes", "area": "Accra", "intent": "diaspora home-base accommodation", "audience": "returning Ghanaians and international family visitors"},
    {"slug": "luxury-short-let-accra", "target": "Accra premium accommodation demand", "area": "Accra", "intent": "luxury short-let", "audience": "guests comparing top-tier short-let options"},
    {"slug": "serviced-apartment-near-tema-station", "target": "Tema Station corridor", "area": "Tema-Accra transfer routes", "intent": "transfer-friendly accommodation", "audience": "intercity travelers and professionals in transit"},
]

SPINTEX_ADVANTAGES = [
    "Spintex Suites gives you a quieter luxury base while keeping commute options open via the Spintex corridor.",
    "Our concierge-style service removes the uncertainty that often comes with short-let bookings in busy cities.",
    "Guests appreciate how our team combines privacy, speed, and polished service standards from check-in to checkout.",
    "Compared with generic apartments, Spintex Suites adds hospitality consistency and direct guest support every day.",
]

FEATURE_LINES = [
    "Each suite includes fast Wi-Fi, reliable climate control, high-quality bedding, and a smart workstation setup.",
    "Interiors are curated with contemporary finishes, comfortable seating zones, and premium in-room lighting.",
    "Housekeeping rhythms, secure access, and responsive support create a smooth stay for both short and longer bookings.",
    "From kitchen-ready conveniences to calm nighttime ambience, details are selected for modern urban travelers.",
]

TESTIMONIALS = [
    ("\"I needed to move between meetings in Accra and Tema, and Spintex Suites made the whole trip effortless.\"", "— Richard M., Corporate Consultant"),
    ("\"The room felt premium, the service was fast, and the location gave us flexibility every day.\"", "— Sena A., Returning Diaspora Guest"),
    ("\"This is the first place I recommend for professionals who want hotel quality and apartment privacy.\"", "— Maame E., Business Traveler"),
    ("\"Elegant interiors, dependable Wi-Fi, and excellent support from the team from day one.\"", "— Daniel K., Remote Founder"),
]


def esc(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def sentence_variant(i: int, options: list[str]) -> str:
    return options[i % len(options)]


def build_content(page: dict, i: int) -> str:
    intro = [
        f"<p>{page['target']} is one of the most searched places in Accra when travelers compare convenience, prestige, and ease of movement. Guests who choose this part of the city usually want dependable accommodation that keeps them close to priorities without compromising comfort. For this reason, many visitors searching for {page['intent']} ultimately shortlist Spintex Suites.</p>",
        f"<p>Our property in the {page['area']} access zone offers a premium alternative to uncertain listings. Instead of juggling inconsistent standards, guests enjoy a polished environment designed for arrivals at any hour, productive daytime schedules, and restful evenings. The experience is crafted for {page['audience']} who value quality as much as location.</p>",
    ]
    why_stay = [
        f"<p>People stay near {page['target']} because daily logistics become easier. Meetings start on time, transfers are less stressful, and guests can make room for dining, shopping, or family plans without long detours. In Accra, where timing and traffic patterns matter, this proximity has real value.</p>",
        f"<p>There is also a lifestyle advantage. Many of these neighborhoods combine professional activity with modern social options, so guests can transition from work mode to leisure mode quickly. Whether someone is in town for a weekend, a conference, or a month-long assignment, being near {page['target']} helps maintain rhythm and energy.</p>",
        f"<p>For diaspora visitors and global professionals, location confidence supports a better overall trip. Having a familiar landmark nearby simplifies pickups, ride requests, and guest coordination. That practicality is one reason high-intent travelers keep searching for luxury accommodation tied to specific areas in Accra.</p>",
    ]
    best_option = [
        f"<p>Spintex Suites stands out because we pair access with hospitality discipline. {sentence_variant(i, SPINTEX_ADVANTAGES)} Our guest team supports pre-arrival planning, flexible check-in communication, and practical local guidance, so your stay feels organized before you even arrive.</p>",
        f"<p>Another advantage is value clarity. Guests get premium presentation, privacy, and responsive service in one package. That is especially important for {page['audience']}, who cannot risk losing time because of unreliable property management or unclear booking processes.</p>",
        f"<p>Most importantly, we deliver a consistent luxury tone across every stay. From the entrance impression to room readiness, Spintex Suites is designed to feel elevated, calm, and intentionally managed. That consistency is what turns first-time guests into repeat guests whenever they return to Accra.</p>",
    ]
    features = [
        f"<p>{sentence_variant(i, FEATURE_LINES)}</p>",
        f"<p>{sentence_variant(i + 1, FEATURE_LINES)}</p>",
        f"<p>{sentence_variant(i + 2, FEATURE_LINES)}</p>",
        "<ul><li>Luxury studio layout with refined finishes</li><li>Fast Wi-Fi and work-friendly setup</li><li>Premium bedding and privacy-first ambience</li><li>Responsive support via WhatsApp and phone</li><li>Quick access to key Accra roads and landmarks</li></ul>",
    ]
    cta = [
        f"<p>If you are currently comparing options for {page['intent']} near {page['target']}, Spintex Suites offers the premium balance of location, comfort, and guest care. Tell us your dates, preferred room type, and travel purpose, and our team will help you secure the right suite quickly.</p>",
        "<p>Use the direct WhatsApp button for rapid availability checks, or explore suite categories before booking. We are ready to host your next Accra stay with a standard built around elegance, reliability, and convenience.</p>",
    ]
    return "\n".join(intro + why_stay + best_option + features + cta)


def main() -> None:
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    for i, page in enumerate(PAGES):
        keyword = page["slug"].replace("-", " ")
        title = f"{keyword.title()} | Spintex Suites Accra"
        meta = (
            f"Discover premium {keyword} options with Spintex Suites. Enjoy luxury studios, concierge-style service, and convenient access to {page['target']} in Accra."
        )
        h1 = keyword.title()
        canonical = f"https://spintexsuites.com/{page['slug']}.html"
        testimonial_quote, testimonial_name = TESTIMONIALS[i % len(TESTIMONIALS)]
        html = template
        replacements = {
            "{{TITLE}}": esc(title),
            "{{META_DESCRIPTION}}": esc(meta),
            "{{CANONICAL}}": canonical,
            "{{H1}}": esc(h1),
            "{{BREADCRUMB_LABEL}}": esc(h1),
            "{{AREA}}": esc(page["area"]),
            "{{TARGET}}": esc(page["target"]),
            "{{CONTENT}}": build_content(page, i),
            "{{TESTIMONIAL_QUOTE}}": esc(testimonial_quote),
            "{{TESTIMONIAL_NAME}}": esc(testimonial_name),
            "{{SLUG}}": page["slug"],
        }
        for token, value in replacements.items():
            html = html.replace(token, value)
        (ROOT / f"{page['slug']}.html").write_text(html, encoding="utf-8")

    print(f"Generated {len(PAGES)} programmatic SEO pages.")


if __name__ == "__main__":
    main()
