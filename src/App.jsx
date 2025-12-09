import { motion } from "framer-motion";
import { useState } from "react";
import { Download, X } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const [selectedDesktopImage, setSelectedDesktopImage] = useState(0);
  const [mobileModalImage, setMobileModalImage] = useState(null);

  const galleryImages = [
    { src: "./formal.jpg", alt: "Formal" },
    { src: "./koti.jpg", alt: "Traditional" },
    { src: "./black-lonavala.jpg", alt: "Casual" },
  ];

  const biodata = {
    name: "Dipen Motka",
    caste: "Hindu (Kadva Patel)",
    dob: "13/10/2000",
    blood: "AB+",
    height: `5' 7"`,
    weight: "70 kg",
    age: "25",
    education: "B.E. in Computer Engineering",
    company: "Digicorp Information Systems Pvt. Ltd.",
    currentPlace: "Ahmedabad",
    family: {
      father:
        "Ashokbhai Bhavjibhai Motka — Principal at Charadva Secondary School",
      mother: "Madhuben Ashokbhai Motka — Homemaker",
      brother: "Niket Motka — Pursuing B.E. in Computer Engineering",
      native: "Mota Ankevaliya, Dhrangadhara",
      current: "Halvad",
      maternalUncle:
        "Jitubhai Govindbhai Sitapara — ITI Professor (Native: Tikar, Halvad — Currently Morbi)",
    },
    property: [
      "🌳 40 vigha land in Mota Ankevaliya",
      "🏠 Duplex at Porbandar",
      "🏠 Duplex at Halvad",
      "🏭 Partnership in Anjani Ceramic, Thangadh",
    ],
  };

  // PDF Generate
  const handleDownloadPDF = async () => {
    try {
      const element = document.querySelector(".biodata-root");
      if (!element) return alert("Error while downloading PDF.");

      const clone = element.cloneNode(true);
      const temp = document.createElement("div");

      temp.style.position = "fixed";
      temp.style.left = "-9999px";
      temp.style.background = "#fff";
      temp.appendChild(clone);
      document.body.appendChild(temp);

      const canvas = await html2canvas(temp, { scale: 2 });
      document.body.removeChild(temp);

      const pdf = new jsPDF("p", "mm", "a4");
      const img = canvas.toDataURL("image/png");
      const imgW = 210;
      const imgH = (canvas.height * imgW) / canvas.width;

      let heightLeft = imgH;

      pdf.addImage(img, "PNG", 0, 0, imgW, imgH);
      heightLeft -= 297;

      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(img, "PNG", 0, heightLeft - imgH, imgW, imgH);
        heightLeft -= 297;
      }

      pdf.save("biodata.pdf");
    } catch (err) {
      console.error(err);
      alert("Unable to generate PDF.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-5xl biodata-root">

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >

          {/* HERO SECTION */}
          <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-10 border-b border-gray-200">

            {/* Left Content */}
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-light">{biodata.name}</h1>
              <p className="text-gray-600 mb-6">Software Engineer</p>

              {/* Mobile Image */}
              <motion.img
                src="./profile1.jpg"
                className="
                  sm:hidden 
                  w-full max-w-xs mx-auto 
                  rounded-lg shadow-md object-contain bg-white border
                "
              />

              <br />

              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                👤 Personal Information
              </h3>

              <div className="space-y-3">
                <InfoRow label="Caste" value={biodata.caste} />
                <InfoRow label="Height" value={biodata.height} />
                <InfoRow label="Weight" value={biodata.weight} />
                <InfoRow label="Date of Birth" value={biodata.dob} />
                <InfoRow label="Current Place" value={biodata.currentPlace} />
              </div>
            </div>

            {/* Desktop Image */}
            <motion.img
              src="./profile1.jpg"
              className="
                hidden sm:block
                w-full sm:w-72 h-80 sm:h-96 
                rounded-lg shadow-md object-contain bg-white border
              "
            />

          </div>

          {/* BODY SECTIONS */}
          <div className="p-6 sm:p-10 space-y-8">

            {/* Education + Job */}
            <div className="grid sm:grid-cols-2 gap-8">
              <ElegantSection icon="🎓" title="Education">
                <InfoRow label="Qualification" value={biodata.education} />
              </ElegantSection>

              <ElegantSection icon="💼" title="Professional">
                <InfoRow label="Occupation" value={biodata.company} />
              </ElegantSection>
            </div>

            {/* Family */}
            <ElegantSection icon="👨‍👩‍👦" title="Family Background">
              <InfoRow label="Father" value={biodata.family.father} />
              <InfoRow label="Mother" value={biodata.family.mother} />
              <InfoRow label="Brother" value={biodata.family.brother} />
              <InfoRow label="Native Place" value={biodata.family.native} />
              <InfoRow label="Current Residence" value={biodata.family.current} />
              <InfoRow label="Maternal Uncle" value={biodata.family.maternalUncle} />
            </ElegantSection>

            {/* Property */}
            <ElegantSection icon="🏠" title="Assets & Property">
              <div className="grid sm:grid-cols-2 gap-3">
                {biodata.property.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 2 }}
                    className="flex gap-3 p-4 bg-gray-50 border rounded-lg"
                  >
                    <span className="text-amber-700 font-bold text-lg">✓</span>
                    <p className="text-gray-700">{p}</p>
                  </motion.div>
                ))}
              </div>
            </ElegantSection>
          </div>

          {/* -------------------- GALLERY -------------------- */}
          <div className="p-6 lg:p-10 border-t border-gray-200">

            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">📸</div>
              <h2 className="text-xl font-semibold">Gallery</h2>
            </div>

            <div className="flex gap-4">

              {/* DESKTOP THUMBNAILS */}
              <div className="hidden xl:flex flex-col gap-2">
                {galleryImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedDesktopImage(idx)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedDesktopImage === idx
                        ? "border-amber-700 shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <img src={img.src} className="w-20 h-20 object-cover" />
                  </motion.button>
                ))}
              </div>

              {/* DESKTOP LARGE PREVIEW */}
              <div className="hidden xl:flex flex-1 items-center justify-center bg-gray-50 border rounded-lg">
                <img
                  src={galleryImages[selectedDesktopImage]?.src}
                  className="h-[600px] object-contain"
                />
              </div>

              {/* MOBILE + TABLET THUMBNAILS */}
              <div className="xl:hidden w-full flex justify-center gap-4 pb-4 flex-wrap">
                {galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMobileModalImage(idx)}
                    className="w-24 h-24 rounded-lg border bg-gray-100 overflow-hidden"
                  >
                    <img src={img.src} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

          {/* Footer */}
          <footer className="py-6 px-6 text-center text-sm text-gray-600 border-t bg-gray-50">
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 border rounded-md flex items-center gap-2 mx-auto"
            >
              <Download size={14} /> Download
            </button>
          </footer>

        </motion.div>
      </div>

      {/* -------------------- MOBILE FULLSCREEN MODAL -------------------- */}
      {mobileModalImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setMobileModalImage(null)}
        >
          <motion.div
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            className="relative max-w-3xl w-full max-h-[90vh] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full"
              onClick={() => setMobileModalImage(null)}
            >
              <X size={18} />
            </button>

            <img
              src={galleryImages[mobileModalImage].src}
              className="max-h-[85vh] mx-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/* ---------------------------------------- COMPONENTS ---------------------------------------- */

const ElegantSection = ({ title, icon, children }) => (
  <motion.div className="border-l-2 border-amber-700 pl-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-2xl">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <div className="space-y-3">{children}</div>
  </motion.div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pb-3 border-b last:border-0">
    <span className="font-semibold text-gray-700 min-w-max uppercase text-sm">
      {label}
    </span>
    <span className="text-gray-700">{value}</span>
  </div>
);
