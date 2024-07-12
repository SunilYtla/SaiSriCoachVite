import React from "react";
import { Document, Page, Text, Image, StyleSheet } from "@react-pdf/renderer";

const style = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PDFFile: React.FC = () => {
  return (
    <Document>
      <Page style={style.body}>
        <Text style={style.header} fixed>
          ~ Created with react-pdf ~
        </Text>
        <Text style={style.title}>The Title</Text>

        <Image style={style.image} src="https://source.unsplash.com/random" />
        <Text
          style={style.pageNumber}
          render={({ pageNumber, totalPages }) => {
            return `${pageNumber} / ${totalPages}`;
          }}
        />
      </Page>
    </Document>
  );
};

export default PDFFile;
