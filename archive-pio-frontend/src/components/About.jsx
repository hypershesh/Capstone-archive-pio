import './About.css';
import header_about from '../assets/About_header_bg.png';
import logo from '../assets/gmc-logo.png';
import building from '../assets/Home-img.png'; // lagay ka image dito
import old_gmc from '../assets/Home-img.png'; // lagay ka image dito
import map from '../assets/Home-img.png'; // lagay ka image dito
import market from '../assets/Home-img.png'; // lagay ka image dito
import government from '../assets/Home-img.png'; // lagay ka image dito
import education from '../assets/Home-img.png'; // lagay ka image dito
import health from '../assets/Home-img.png'; // lagay ka image dito
import transpo from '../assets/Home-img.png'; // lagay ka image dito

export default function About() {
  return (
    <div className="about-page">
      {/* HEADER */}
      <div className="about-header">
        <img
          src={header_about}
          alt="About Header Background"
          className="about-bg-img"
        />
        <div className="about-overlay-content container">
          <div className="logo-wrapper">
            <img src={logo} alt="Gumaca Logo" className="header-logo" />
            <div className="logo-text_about">
              <h2>About Gumaca</h2>
              <h4>
                Learn more about our municipality's heritage and aspirations
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="container about-content">
        <div className="about-wrapper">
          
        <div className="about-main-GPIO">
            <div className="about-left-GPIO">
              <h1 className="main-profile-title-GPIO">Gumaca Public Information Office</h1>
              <p className="profile-desc-GPIO">
                "Delivering timely and accessible public information through digital innovation and community engagement."
              </p>
            </div>
            <div className="about-right-GPIO">
              <img src={building} alt="Municipal Building" className="main-rect-img" />
            </div>
          </div>

          {/* MISSION & VISION SECTION */}
          <div className="mission-vision">
            <div className="mv-line"></div>
            <h2>MISSION & VISION</h2>
            <div className="mv-boxes">
              <div className="mv-box">
                {/* Add Mission Text Here */}
              </div>
              <div className="mv-box">
                {/* Add Vision Text Here */}
              </div>
            </div>
            <div className="mv-line"></div>
          </div>

          {/* MUNICIPAL PROFILE (TOP SECTION) */}
          <div className="about-main">
            <div className="about-left">
              <h1 className="main-profile-title">Municipal Profile</h1>
              <p className="profile-desc">
                "One of the oldest and most progressive municipalities in Quezon
                Province, serving as a center of trade, religion, and governance."
              </p>
            </div>
            <div className="about-right">
              <img src={building} alt="Municipal Building" className="main-rect-img" />
            </div>
          </div>

          {/* QUICK INFO CARDS */}
          <div className="about-cards">
            <div className="card">
              <p>Province</p>
              <h4>Quezon Province</h4>
            </div>
            <div className="card">
              <p>Classification</p>
              <h4>1st class municipality</h4>
            </div>
            <div className="card">
              <p>Barangays</p>
              <h4>59</h4>
            </div>
          </div>

          {/* TOWN PROFILE MAIN TITLE */}
          <div className="town-profile-header">
            <h2 className="town-title">Town Profile</h2>
          </div>

          {/* HISTORICAL BACKGROUND */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Historical background</h2>
                
                <p>
                  Gumaca is one of the oldest towns in Quezon Province and was already a 
                  well-established community even before the arrival of the Spaniards. 
                  As early as the 14th century, it had its own barangay government led by 
                  rulers such as Lakan Bugtali and Lakan Gitingan.
                </p>

                <p>
                  The town once covered territories that now belong to several municipalities 
                  including Atimonan, Plaridel, Lopez, Calauag, Alabat, Perez, Unisan, Pitogo, 
                  and Macalelon. It was strategically located at the mouth of the Pipisik 
                  River and at the foot of the Sierra Madre range, making it a center of 
                  trade and commerce.
                </p>
                
                <p>
                  In 1582, Franciscan friar Fray Diego de Oropesa introduced Christianity 
                  and established the first visita, declaring St. Diego de Alcala as the 
                  patron saint. By 1686, Gumaca became a full-fledged town with its own 
                  civil government.
                </p>
              </div>

              <div className="town-right">
                <img src={old_gmc} alt="Old Gumaca" className="rounded-town-img" />
              </div>
            </div>
          </div>

          {/* GEOGRAPHICAL LOCATION */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Geographical Location</h2>
                <p>
                Gumaca is becoming a center for national and provincial government agencies. It hosts offices such as the Department of Agrarian Reform, Bureau of Internal Revenue, Philippine Coconut Authority, Social Security System, and Department of Environment and Natural Resources.
                </p>
                <p>
                The municipality is also home to the Regional Trial Court and the Department of Public Works and Highways, strengthening its role as an administrative center in the region.
                </p>
              </div>
              <div className="town-right">
                <img src={map} alt="Map" className="rounded-town-img" />
              </div>
            </div>
          </div>

          {/* ECONOMY & INDUSTRY */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Economy & Industry</h2>
                <p>
                Gumaca is a first-class municipality recognized as the financial, commercial, and religious center of Southern Quezon. It hosts several banking institutions, financing companies, and over 600 registered business establishments.


                </p>
                <p>
                Major corporations maintain warehouses in the municipality to serve nearby towns. Industrial operations such as oil mills, wood industries, and food processing contribute to local economic growth. The municipality also serves as a trading hub for agricultural and commercial products.
                </p>
              </div>
              <div className="town-right">
                <img src={market} alt="Market" className="rounded-town-img" />
              </div>
            </div>
          </div>

          {/* 🔥 GOVERNMENT & PUBLIC SERVICE */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Government & public service</h2>
                <p>
                Gumaca is becoming a center for national and provincial government agencies. It hosts offices such as the Department of Agrarian Reform, Bureau of Internal Revenue, Philippine Coconut Authority, Social Security System, and Department of Environment and Natural Resources.

                </p>
                <p>
                The municipality is also home to the Regional Trial Court and the Department of Public Works and Highways, strengthening its role as an administrative center in the region.
                </p>
              </div>
              <div className="town-right">
                <img src={government} alt="Government Service" className="rounded-town-img" />
              </div>
            </div>
          </div>

          {/* 🔥 EDUCATION */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Education</h2>
                <p>
                  Gumaca provides a wide range of educational services through public and
                  private institutions. Colleges such as Eastern Quezon College, Mt. St. Aloysius
                  College Seminary, and Holy Child Jesus College serve higher education needs.
                </p>
                <p>
                  Several public and private high schools and elementary schools operate within
                  the municipality, along with technical and vocational institutions such as Aceba
                  Systems Technology Institute. Learning centers also provide early childhood
                  education.
                </p>
              </div>
              <div className="town-right">
                <img src={education} alt="Education in Gumaca" className="rounded-town-img" />
              </div>
            </div>
          </div>

          {/* 🔥 HEALTH SERVICES */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Health Services</h2>
                <p>
                  Healthcare services in Gumaca include a government district hospital, 
                  a private general hospital, and several medical, dental, and diagnostic clinics.
                </p>
                <p>
                  The municipality is supported by pharmacies, pre-need service providers, 
                  and other healthcare facilities that ensure access to essential medical 
                  services for residents.
                </p>
              </div>
              <div className="town-right">
                {/* Siguraduhing i-import ang tamang image para dito */}
                <img src={health} alt="Health Services" className="rounded-town-img" />
              </div>
            </div>
          </div>

          {/* 🔥 TRANSPORTATION & COMMUNICATION */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Transportation & Communication</h2>
                <p>
                  Gumaca is accessible through the Maharlika Highway and is served by 
                  multiple bus lines connecting it to Metro Manila, Bicol, and other regions. 
                  Rail services are also available through the Philippine National Railways.
                </p>
                <p>
                  Communication services are supported by major telecommunications providers, 
                  ensuring connectivity through mobile networks, internet, cable services, 
                  and radio broadcasting.
                </p>
              </div>
              <div className="town-right">
                {/* Placeholder muna o gamitin ang tamang image asset */}
                <div className="image-placeholder">
                  <img src={transpo} alt="Transportation" className="rounded-town-img" />
                </div>
              </div>
            </div>
          </div>

          {/* 🔥 TOURISM & LANDMARKS */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Tourism & Landmarks</h2>
                <p>
                  Gumaca offers a variety of natural and historical attractions. Visitors can enjoy
                  the scenic views of Lamon Bay, beach resorts, and the San Diego Park.
                </p>
                <p>
                  Historical landmarks include the San Diego Fort, built during the Spanish
                  period, and the centuries-old Gumaca Cathedral, known as one of the largest
                  churches in the province. These sites reflect the rich cultural and religious
                  heritage of the municipality.
                </p>
              </div>
              <div className="town-right">
                {/* Gamitin ang tamang image variable para sa San Diego Fort */}
                <img src={old_gmc} alt="San Diego Fort" className="rounded-town-img" />
              </div>
            </div>
          </div>

          {/* 🔥 FESTIVALS & CULTURE */}
          <div className="town-section">
            <div className="town-content">
              <div className="town-left">
                <h2 className="section-title-red">Festivals & Culture</h2>
                <p>
                  Gumaca celebrates vibrant cultural and religious festivals, including the Araña at
                  Baluarte Festival, which highlights local traditions and agricultural abundance.
                </p>
                <p>
                  The town honors its patron saint, St. Diego de Alcala, every November 12.
                  Other celebrations include the Peñafrancia festival and the Feast of San
                  Isidro Labrador, showcasing the community's strong cultural identity and
                  devotion.
                </p>
              </div>
              <div className="town-right">
                {/* Gamitin ang tamang image variable para sa Araña at Baluarte */}
                <img src={old_gmc} alt="Baluarte Festival" className="rounded-town-img" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
