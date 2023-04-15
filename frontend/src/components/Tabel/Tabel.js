import React, { useEffect, useReducer, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export function Tabel() {

    const [brandData, setBrandData] =  useState([]);
    const [brandsFinal, setBrandsFinal] = useState({});
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    let brandsRow = {};

    const getCompanies = async() => {
        const {data} = await axios.get("http://localhost:5000/api/extract_data/get_brands")
                                     .catch((err) => {
                                        console.log(err);
                                     });
        let brands = []
        for (const current_brand of data)
            brands.push(current_brand);
        setBrandData(brands);
    }

    const getProfilePromise = async(brandname, {id, profile_type}) => {
        axios.get(`http://localhost:5000/api/extract_data/get_profile/${id}/${profile_type}`)
        .then((result) => result.data)
        .then(({engagement, fans}) => {
            if(engagement != null)
                brandsRow[brandname].engagement += engagement;
            if(fans != null)
                brandsRow[brandname].fans += fans
          forceUpdate()
          setBrandsFinal(brandsRow);
        })
        .catch((err) => {
            console.log(`Eroare la ${brandname}`)
            console.log(err)
        });
    }

    const getData = async({brandname, profiles}) => {
        for(const profile of profiles)
            getProfilePromise(brandname, profile)
    }

    const createRow = () => {
        brandsRow = {};
        for(const brand of brandData) { 
            brandsRow[brand.brandname] = {"engagement":0, 
                                          "fans":0, 
                                          "noProfiles":brand.profiles.length
                                        }
            getData(brand)
        }
        forceUpdate()
        setBrandsFinal(brandsRow);
    }

    useEffect(() => {
        getCompanies();
    }, [])

    useEffect(() => {
        createRow();
    }, [brandData]);

    useEffect(() => {
    }, [brandsFinal, ignored]);



    return (
    <div>
         <Table striped bordered hover>
            <thead>
                <tr>
                <th>Brand Name</th>
                <th>Total Profiles</th>
                <th>Total Fans</th>
                <th>Total Engangement</th>
                </tr>
            </thead>
            <tbody>
                {
                Object.keys(brandsFinal).map((brandName) => {
                    return( <tr key={brandName.toString()}>
                        <td>{brandName}</td>
                        <td>{brandsFinal[brandName].noProfiles}</td>
                        <td>{brandsFinal[brandName].engagement}</td>
                        <td>{brandsFinal[brandName].fans}</td>
                    </tr>)
                })
                }
            </tbody>
         </Table>
    </div>
    );
}