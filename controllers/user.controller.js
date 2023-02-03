const { response } = require("express");
const fs = require("fs");
const { parse } = require("path");

const dataFile = process.cwd() + "/data/user.json";

exports.getAll = (req, res) => {
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return res.json({ status: false, message: readErr });
        }

        const savedData = data ? JSON.parse(data) : [];

        return res.json({ status: true, result: savedData });
    });
};

exports.create = (req, res) => {
    const { userName, firstName, lastName, age, address, isAdmin } = req.body;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return res.json({ status: false, message: readErr });
        }

        const parsedData = data ? JSON.parse(data) : [];

        const newObj = {
            id: Date.now().toString() + "user",
            userName,
            firstName,
            lastName,
            age,
            address,
            isAdmin,
        };

        parsedData.push(newObj);

        fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
            if (writeErr) {
                return res.json({ status: false, message: writeErr });
            }

            return res.json({ status: true, result: parsedData });
        });
    });
};

exports.update = (req, res) => {
    const { userName, firstName, lastName, age, address, isAdmin } = req.body;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return res.json({ status: false, message: readErr });
        }

        const parsedData = data ? JSON.parse(data) : [];

        const updatedData = parsedData.map((e) => {
            if (e.id == id) {
                return {
                    ...e,
                    userName,
                    firstName,
                    lastName,
                    age,
                    address,
                    isAdmin,
                };
            } else {
                return e;
            }
        });

        fs.writeFile(
            dataFile,
            "utf-8",
            JSON.stringify(updatedData),
            (writeErr) => {
                if (writeErr) {
                    return res.json({ status: false, message: writeErr });
                }

                return res.json({ status: true, result: updatedData });
            }
        );
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return res.json({ status: false, message: readErr });
        }

        const parsedData = data ? JSON.parse(data) : [];
        const updatedData = parsedData.filter((e) => e.id != id);

        fs.writeFile(
            dataFile,
            "utf-8",
            JSON.stringify(updatedData),
            (writeErr) => {
                if (writeErr) {
                    return res.json({ status: false, message: writeErr });
                }

                return res.json({ status: true, result: updatedData });
            }
        );
    });
};
