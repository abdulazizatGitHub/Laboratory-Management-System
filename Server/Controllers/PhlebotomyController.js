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
        const { state, patientDetails, report, remarks, generatedBy, dateTime } = req.body;
        
        const phlebotomyReport = new PhlebotomyReportModel({
            state,
            patientDetails,
            report,
            remarks,
            generatedBy,
            dateTime
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