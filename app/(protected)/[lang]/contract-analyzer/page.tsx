import UploadDoc from "@/components/general/uploadDoc/uploadDoc";
import React from "react";

const ContractChecker: React.FC = () => {
  return (
    <div className="">
      <h2 className="font-bold text-3xl mb-4">Contract Analyzer</h2>
      <p className="mt-4 text-gray-600 mb-8">
        This feature is better optimized for contracts only. If you have a
        different type of document we advise using the "Document Analyzer"
        feature.
      </p>

      <UploadDoc />
    </div>
  );
};

export default ContractChecker;
