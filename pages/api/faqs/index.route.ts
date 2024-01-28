import { faqsData } from "dh-marvel/components/faqs/faqsData";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        res.status(200).json(faqsData);
    } else {
        res.status(400).json({ message: "El método no es permitido" });
    }
}
