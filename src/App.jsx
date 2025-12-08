import { motion } from "framer-motion";
import {
  Download,
} from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = [
    { src: "/formal.jpg", alt: "Formal Photo" },
    { src: "/koti.jpg", alt: "Casual Photo 2" },
    { src: "/black-lonavala.jpg", alt: "Casual Photo 1" },
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
    phone: "+91 98765 43210",
    email: "dipen.patel@example.com",
    family: {
      father:
        "Ashokbhai Bhavjibhai Motka — Principal at Charadva Secondary School",
      mother: "Madhuben Ashokbhai Motka — Homemaker",
      brother: "Niket Motka — Pursuing BE in Computer",
      native: "Mota Ankevaliya, Dhrangadhara",
      current: "Halvad",
      maternalUncle:
        "Jitubhai Govindbhai Sitapara — ITI Professor (Native: Tikar (Rann), Halvad) — Currently Morbi",
    },
    property: [
      "🌳 40 vigha land in Mota Ankevaliya",
      "🏠 1 Duplex at Porbandar",
      "🏠 1 Duplex at Halvad",
      "🏭 Partnership in Anjani Ceramic, Thangadh",
    ],
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.querySelector(".w-full.max-w-5xl");
      if (!element) {
        alert("Could not find content to download");
        return;
      }

      // Clone the element to avoid modifying the original
      const clone = element.cloneNode(true);
      
      // Create a temporary container
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "fixed";
      tempContainer.style.left = "-9999px";
      tempContainer.style.width = element.offsetWidth + "px";
      tempContainer.style.backgroundColor = "#ffffff";
      tempContainer.appendChild(clone);
      document.body.appendChild(tempContainer);

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("biodata.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8 flex justify-center">

      <div className="w-full max-w-5xl">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Hero Section Header */}
          <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-10 border-b border-gray-200">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-2">{biodata.name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">Software Engineer</p>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">👤 Personal Information</h3>
              <div className="space-y-3">
                <InfoRow label="Caste" value={biodata.caste} />
                <InfoRow label="Height" value={biodata.height} />
                <InfoRow label="Weight" value={biodata.weight} />
                <InfoRow label="Date of Birth" value={biodata.dob} />
                <InfoRow label="Current Place" value={biodata.currentPlace} />
              </div>
            </div>
            <motion.img
              src="/profile1.jpg"
              alt="profile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full sm:w-72 h-80 sm:h-96 rounded-lg shadow-md object-contain bg-white border"
            />
          </div>

          {/* Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Education & Occupation */}
            <div className="grid sm:grid-cols-2 gap-8">
              <ElegantSection icon="🎓" title="Education">
                <InfoRow label="Qualification" value={biodata.education} />
              </ElegantSection>
              <ElegantSection icon="💼" title="Professional">
                <InfoRow label="Occupation" value={biodata.company || "Open to Opportunities"} />
              </ElegantSection>
            </div>

            {/* Family Information */}
            <ElegantSection icon="👨‍👩‍👦" title="Family Background">
              <InfoRow label="Father" value={biodata.family.father} />
              <InfoRow label="Mother" value={biodata.family.mother} />
              <InfoRow label="Brother" value={biodata.family.brother} />
              <InfoRow label="Native Place" value={biodata.family.native} />
              <InfoRow label="Current Residence" value={biodata.family.current} />
              <InfoRow label="Maternal Uncle" value={biodata.family.maternalUncle} />
            </ElegantSection>

            {/* Property Details */}
            <ElegantSection icon="🏠" title="Assets & Property">
              <div className="grid sm:grid-cols-2 gap-3">
                {biodata.property.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 2 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-amber-50 transition"
                  >
                    <span className="text-amber-700 font-bold text-lg">✓</span>
                    <p className="text-gray-700 font-medium">{p}</p>
                  </motion.div>
                ))}
              </div>
            </ElegantSection>
          </div>

          {/* Gallery Section with Image Viewer */}
          <div className="p-6 sm:p-10 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">📸</div>
              <h2 className="text-xl font-semibold text-gray-900">Gallery</h2>
            </div>
            
            {/* Side by Side Layout */}
            <div className="flex gap-4">
              {/* Vertical Menu on Left */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                {galleryImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative overflow-hidden rounded-lg border-2 transition bg-gray-50 flex items-center justify-center flex-shrink-0 ${
                      selectedImage === idx
                        ? "border-amber-700 shadow-lg"
                        : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                    />
                    {selectedImage === idx && (
                      <div className="absolute inset-0 bg-amber-700/20"></div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Large Preview on Right */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-1 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center"
              >
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="w-full h-96 sm:h-[600px] object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Additional Gallery Section */}
          <div className="p-6 sm:p-10 border-t border-gray-200">
            <p className="text-gray-600">
              More photos:{" "}
              <a
                href="https://drive.google.com/drive/folders/1dK9czUu06W5V1DqlhZhRLMLNPzeEhejO"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 font-semibold hover:underline"
              >
                View on Google Drive
              </a>
            </p>
          </div>

          {/* Footer */}
          <footer className="py-6 px-6 sm:px-10 text-center text-sm text-gray-600 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 border border-gray-400 text-gray-700 rounded-md flex items-center gap-1.5 hover:bg-gray-100 transition font-medium text-xs whitespace-nowrap"
            >
              <Download size={14} /> Download
            </button>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}

const ElegantSection = ({ title, icon, children, color = "indigo" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-l-2 border-amber-700 pl-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </motion.div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pb-3 border-b border-gray-100 last:border-0">
    <div className="font-semibold text-gray-700 min-w-max text-sm uppercase tracking-wide">{label}</div>
    <div className="text-gray-700 flex-1">{value}</div>
  </div>
);
