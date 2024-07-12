import { PDFDownloadLink } from "@react-pdf/renderer";

function DownloadButton({ document }: { document: React.ReactElement }) {
  return (
    <PDFDownloadLink document={document} fileName="FORM">
      {({ blob, url, loading, error }) =>
        loading ? (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            loading document
          </button>
        ) : (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            download
          </button>
        )
      }
    </PDFDownloadLink>
  );
}

export default DownloadButton;
