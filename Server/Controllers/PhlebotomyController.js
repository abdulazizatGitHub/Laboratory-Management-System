import GenToken from "../Models/GenerateToken.js";
import PhlebotomyReportModel from "../Models/PhlebotomyReportModel.js";
export const getTokenDetails = async (req, res) => {
    try {
        const tokenDetails = await GenToken.find();
        res.status(200).json(tokenDetails);
    } catch (error) {
        console.error("Error fetching token details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addPhlebotomyReport = async (req, res) => {
    try {
        const { tokenNumber,state, patientDetails, report, remarks, generatedBy, dateTime,time } = req.body;
        
        const phlebotomyReport = new PhlebotomyReportModel({
            tokenNumber,
            state,
            patientDetails,
            report,
            remarks,
            generatedBy,
            dateTime,
            time
        });

        const result = await phlebotomyReport.save();

        if(result) {
            res.status(201).json({message: true});
        } else {
            res.status(400).json({ success: false, error: 'Failed to add phlebotomy report' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
    
    
}


export const updateReport = async (req, res) => {
    try {
      // Extract token ID from request parameters
      const tokenId = req.params.id;
  
      
      // Extract updated token data from request body
      const { tokenNumber,
        state,
        patientDetails,
        report,
        remarks,
        generatedBy,
        dateTime,
        time
        } = req.body; 
  
      // Check if the token with the provided ID exists
      const existingReport = await PhlebotomyReportModel.findById(tokenId);
  
      if (!existingReport) {
        return res.status(404).json({ message: 'Token not found' });
      }
  
      // Update the token document with the new data
      existingReport.tokenNumber = tokenNumber;
      existingReport.report = report;
      existingReport.patientDetails = patientDetails;
      existingReport.dateTime = dateTime;
      existingReport.generatedBy = generatedBy;
      existingReport.state= state;
      existingReport.remarks = remarks;
      existingReport.time=time;
      // Save the updated token document
      const updatedReport = await existingReport.save();
  
      res.status(200).json({ message: 'Report updated successfully', report: updatedReport });
    } catch (error) {
      console.error('Error updating Report:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  