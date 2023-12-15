import axios from "axios";


export const getProvinces = async () => {
    const res = await axios.get(`https://provinces.open-api.vn/api/?depth=2`);
    return res.data
}

export const getProvince = async () => {
    const res = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
        headers: {
            "Content-Type": "application/json",
            "token": "b0c08f24-98f5-11ee-a6e6-e60958111f48"
        }
    }
    )
    return res.data
}
export const getDistrist = async (provinceId: number) => {
    const res = await axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
        province_id : provinceId
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": "b0c08f24-98f5-11ee-a6e6-e60958111f48"
        },
    }
    )
    return res.data;
}
interface FeeProps {
    from_district_id?: number,
    to_district_id: number,
}
export const getFeeShipping = async (props : FeeProps) => {
    const res = await axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
        service_type_id: 2,
        insurance_value: 500000,
        coupon: null,
        from_district_id: props.from_district_id,
        to_district_id: props.to_district_id,
        to_ward_code: "",
        height: 15,
        length: 15,
        weight: 1000,
        width: 15
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": "b0c08f24-98f5-11ee-a6e6-e60958111f48",
        },
    }
    )
    return res.data;
}