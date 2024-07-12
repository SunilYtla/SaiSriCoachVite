import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
  },
});

const SampleMailPdf: React.FC = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Sample Letter</Text>
          <Text style={styles.content}>
            Dear [Recipient's Name],
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            aliquet, arcu ut consequat tincidunt, justo mauris eleifend nunc,
            nec lacinia velit metus id nisl.
            <br />
            <br />
            Sincerely,
            <br />
            [Your Name]
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SampleMailPdf;
