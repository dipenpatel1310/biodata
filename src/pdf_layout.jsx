import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Link } from "@react-pdf/renderer";

  const galleryImages = [
    { src: "./formal.jpg", alt: "Formal", width: 170, height: 260 },
    { src: "./koti.jpg", alt: "Traditional", width: 170, height: 260 },
    { src: "./black-lonavala.jpg", alt: "Casual", width: 170, height: 260 },
  ];

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    borderBottom: "1px solid #999",
    paddingBottom: 4,
  },
  row: {
    marginBottom: 10,
    padding: 2,
  },
  label: {
    fontWeight: "bold",
  },
  imageProfile: {
    width: 200,
    height: 270,
    borderRadius: 6,
    marginBottom: 10,
    alignSelf: "center",
  },
  image: {
    borderRadius: 6,
    marginBottom: 10,
    alignSelf: "center",
  },
});

const cleanText = (text) =>
  text.replace(/[\u{1F300}-\u{1FAFF}]/gu, "");  // all emojis removed


export default function BiodataPDF({ biodata }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER + PERSONAL INFO + IMAGE */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          {/* LEFT SIDE: NAME + TITLE + PERSONAL INFO */}
          <View style={{ width: "60%" }}>
            <Text style={styles.name}>{biodata.name}</Text>
            <Text style={styles.role}>Software Engineer</Text>

            <Text style={[
                styles.sectionTitle,
                { marginTop: 30 } // override here
              ]}>Personal Information</Text>

            <Text style={styles.row}>
              <Text style={styles.label}>Caste: </Text>
              {biodata.caste}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Height: </Text>
              {biodata.height}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Weight: </Text>
              {biodata.weight}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Date of Birth: </Text>
              {biodata.dob}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Current Place: </Text>
              {biodata.currentPlace}
            </Text>
          </View>

          {/* RIGHT SIDE: PROFILE IMAGE */}
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Image style={styles.imageProfile} src="./profile1.jpg" />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* EDUCATION */}
          <View style={{ width: "44%" }}>
            <Text style={styles.sectionTitle}>Education</Text>
            <Text style={styles.row}>
              {biodata.education}
            </Text>
          </View>

          {/* PROFESSIONAL */}
          <View style={{ width: "52%" }}>
            <Text style={styles.sectionTitle}>Professional</Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Occupation: </Text>
              {biodata.company}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Salary: </Text>
              {biodata.salary}
            </Text>
          </View>
        </View>

        {/* FAMILY */}
        <Text style={styles.sectionTitle}>Family Background</Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Father: </Text>
          {biodata.family.father}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Mother: </Text>
          {biodata.family.mother}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Brother: </Text>
          {biodata.family.brother}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Native Place: </Text>
          {biodata.family.native}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Current Residence: </Text>
          {biodata.family.current}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Maternal Uncle: </Text>
          {biodata.family.maternalUncle}
        </Text>

        {/* PROPERTY */}
        <Text style={styles.sectionTitle}>Assets & Property</Text>
        {biodata.property.map((item, i) => (
          <Text key={i} style={styles.row}>• {cleanText(item)}</Text>
        ))}

         {/* Gallery */}
        <Text style={styles.sectionTitle}>Gallery</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            // gap: 25,                 // spacing between images
          }}
        >
          {galleryImages.map((img, index) => (
            <Image
              key={index}
              src={img.src}
              style={{
                width: img.width,    
                height: img.height,
                marginBottom: 10,
                borderRadius: 6,
                objectFit: "cover",
              }}
            />
          ))}
        </View> 

         {/* GOOGLE DRIVE LINK */}
        <Text style={styles.sectionTitle}>More Photos</Text>
        <Link
          src="https://drive.google.com/drive/folders/1dK9czUu06W5V1DqlhZhRLMLNPzeEhejO"
          style={styles.link}
        >
          View Google Drive Album
        </Link>
        <Text style={styles.sectionTitle}>Website</Text>
        <Link
          src="https://dipenpatel1310.github.io/biodata/"
          style={styles.link}
        >
         https://dipenpatel1310.github.io/biodata/
        </Link>
      </Page>
    </Document>
  );
}
