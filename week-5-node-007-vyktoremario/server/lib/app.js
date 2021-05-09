"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
let companies = require("./database/db.json");
const server = http_1.default.createServer((req, res) => {
    if (req.method === "GET") {
        if (req.url === "/companies") {
            getCompanies(req, res);
        }
        else {
            if (req.url) {
                if (req.url.match(/\/companies\/[0-9]+/) && req.method === "GET") {
                    const stringId = req.url.split("/")[2];
                    const id = Number(stringId);
                    getCompany(req, res, id);
                }
            }
        }
    }
    else if (req.method === "POST") {
        createCompany(req, res);
    }
    else if (req.url) {
        if (req.url.match(/\/companies\/[0-9]+/) && req.method === "PUT") {
            const stringId = req.url.split("/")[2];
            const id = Number(stringId);
            updateCompany(req, res, id);
        }
        if (req.url.match(/\/companies\/[0-9]+/) && req.method === "DELETE") {
            const stringId = req.url.split("/")[2];
            const id = Number(stringId);
            deleteCompany(req, res, id);
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route Not Found" }));
    }
});
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(companies);
    });
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const company = companies.find((item) => item.id === id);
        resolve(company);
    });
}
function create(company) {
    return new Promise((resolve, reject) => {
        let num = 1;
        let companyId = companies[companies.length - 1].id;
        num += companyId;
        const newcompany = { id: num, ...company };
        companies.push(newcompany);
        writeDataToFile(`${__dirname}/database/db.json`, companies);
        resolve(company);
    });
}
function update(id, company) {
    return new Promise((resolve, reject) => {
        const index = companies.findIndex((item) => item.id === id);
        companies[index] = { id: id, ...company };
        writeDataToFile(`${__dirname}/database/db.json`, companies);
        resolve(companies[index]);
    });
}
function remove(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
        companies = companies.filter((item) => item.id !== id);
        writeDataToFile(`${__dirname}/database/db.json`, companies);
        resolve();
    });
}
// @Desc Gets all companies
async function getCompanies(req, res) {
    try {
        const companies = await findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(companies));
    }
    catch (error) {
        console.log(error);
    }
}
//@Desc Gets single company
async function getCompany(req, res, id) {
    try {
        const company = await findById(id);
        if (!company) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Bros no dey! Ask around" }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(company));
        }
    }
    catch (error) {
        console.log(error);
    }
}
//@Desc Creating a new company
async function createCompany(req, res) {
    try {
        const body = await getPostData(req);
        if (typeof body === "string") {
            const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = JSON.parse(body);
            const company = {
                organization,
                createdAt: new Date(),
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees,
            };
            const newcompany = await create(company);
            res.writeHead(201, { "Conent-Type": "application/json" });
            res.end(JSON.stringify(newcompany));
        }
    }
    catch (error) {
        console.log(error);
    }
}
//@Desc update a company
async function updateCompany(req, res, id) {
    try {
        const company = await findById(id);
        if (!company) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Bros no dey! Ask around" }));
        }
        else {
            const body = await getPostData(req);
            if (typeof body === "string") {
                const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = JSON.parse(body);
                const companyData = {
                    organization: organization || company.organization,
                    createdAt: company.createdAt,
                    updatedAt: new Date(),
                    products: products || company.products,
                    marketValue: marketValue || company.marketValue,
                    address: address || company.marketValue,
                    ceo: ceo || company.ceo,
                    country: country || company.country,
                    noOfEmployees: noOfEmployees || company.noOfEmployees,
                    employees: employees || company.employees
                };
                const updatedcompany = await update(id, companyData);
                res.writeHead(200, { "Conent-Type": "application/json" });
                res.end(JSON.stringify(updatedcompany));
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
//@Desc delete single companyn
async function deleteCompany(req, res, id) {
    try {
        const company = await findById(id);
        if (!company) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Bros no dey! Ask around" }));
        }
        else {
            await remove(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `company with the id of ${id} has been removed` }));
        }
    }
    catch (error) {
        console.log(error);
    }
}
function writeDataToFile(filename, content) {
    fs_1.default.writeFileSync(filename, JSON.stringify(content), "utf8");
}
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
server.listen(5500, () => {
    console.log(`Server is up and running o! No go loose guard!!`);
});
