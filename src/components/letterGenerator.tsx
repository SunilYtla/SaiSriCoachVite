import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import { FormData } from "./Form";
import SaiSriLogo from "../assets/SaiSri.png";
import KethakiLogo from "../assets/Kethaki.png";

interface SampleLetterProps {
  data: FormData;
}

const style = StyleSheet.create({
  bigtext: {
    fontSize: 14,
    lineHeight: 1.3,
  },
  text: {
    fontSize: 12,
    textAlign: "justify",
    lineHeight: 1.3,
  },
  heading: {
    fontSize: 18,
  },

  centercontent: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },

  date: {
    fontSize: 12,
    textAlign: "right",
  },
  subject: {
    marginVertical: 12,
  },
  content: {
    marginVertical: 6,
  },
  letterhead: {
    flexDirection: "row",
    paddingBottom: 12,
    borderBottom: 2,
    borderColor: "red",
  },
  letterheadheading: { color: "red", paddingBottom: 8 },

  image: {
    width: 80,
    height: 80,
  },
});

const renderLetterhead = (company: string | null) => {
  if (company === null) {
    return null;
  }
  let email = "";
  let companyname = "";
  let logo = SaiSriLogo;
  if (company === "SaiSri") {
    email = "saisricoachbuilders@gmail.com";
    companyname = "SAI SRI COACH BUILDERS";
    logo = SaiSriLogo;
  } else if (company === "Kethaki") {
    email = "kethakiengineering@gmail.com";
    companyname = "KETHAKI ENGINEERING";
    logo = KethakiLogo;
  }
  return (
    <View style={style.letterhead}>
      <View style={{ paddingRight: 16 }}>
        <Image src={logo} style={style.image} />
      </View>
      <View
        style={{
          flex: 1,
          textAlign: "center",
        }}
      >
        <Text style={style.letterheadheading}>{`${companyname}`}</Text>
        <Text style={{ fontSize: 12, lineHeight: 1.3 }}>
          {`# Door No. 14-16/2, Dhulapally Road, Steelcity Backside 
          Back Side Road I. D. A., Jeedimetla, Hyderabad - 500100, Telangana.
          Cell No. 9703100966, 8801071978
          ${email}`}
        </Text>
      </View>
    </View>
  );
};

const tabSpace = "        ";
const SampleLetter: React.FC<SampleLetterProps> = ({ data }) => {
  // const data = useFormStore((state) => state.formData);
  const {
    date,
    quotationnumber,
    recipientName,
    recipientAddress,
    subject,
    bodytext,
    sender,
    letterhead,
  } = data;
  return (
    <Document>
      <Page style={style.body}>
        {renderLetterhead(letterhead)}
        <View style={style.centercontent}>
          {quotationnumber ? (
            <Text style={style.heading} fixed>
              Quotation No. {quotationnumber}
            </Text>
          ) : null}
        </View>
        {date ? <Text style={style.date}>Date: {date}</Text> : null}
        {recipientName !== null && recipientAddress !== null ? (
          <>
            <Text style={style.bigtext}>To,</Text>

            <Text style={style.text}>{recipientName}</Text>
            <Text style={style.text}>{recipientAddress}</Text>
            <Text style={style.text}>Rangareddy- 500055</Text>
            <Text style={style.text}>Telangana</Text>
          </>
        ) : null}

        {subject ? (
          <View style={style.subject}>
            <Text style={style.text}>
              <Text style={style.bigtext}>Subject: </Text>
              {subject}
            </Text>
          </View>
        ) : null}

        {bodytext ? (
          <>
            <Text style={style.bigtext}>Dear Sir,</Text>

            <View style={style.content}>
              <Text style={[style.text, { lineHeight: 1.5 }]}>
                {tabSpace}
                {bodytext}
              </Text>
            </View>
          </>
        ) : null}

        {sender ? (
          <>
            <Text style={style.text}>From</Text>
            <Text style={style.text}>{sender.toUpperCase()}</Text>
          </>
        ) : null}
      </Page>
    </Document>
  );
};

export default SampleLetter;
export type { FormData, SampleLetterProps };
