import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    editUser,
    updateUser,
} from "./../../Redux/Actions/userActions";
import { USER_UPDATE_RESET } from "../../Redux/Constants/UserContants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const EditUserMain = (props) => {
    const { userId } = props;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [thumb, setThumb] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [street, setStreet] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [role, setRole] = useState("");

    const dispatch = useDispatch();

    const userEdit = useSelector((state) => state.userEdit);
    const { loading, error, user } = userEdit;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            toast.success("Cập nhật người dùng thành công!", ToastObjects);
        } else {
            if (!user.first_name || user._id !== userId) {
                console.log("cant get user");
                dispatch(editUser(userId));
            } else {
                setFirstName(user.first_name);
                setLastName(user.last_name);
                setEmail(user.email);
                setPhoneNumber(user.phone_number);
                setUsername(user.username);
                setPassword(user.password);
                setAvatar(user.avatar);
                setThumb(user.thumb);
                setProvince(user.province);
                setDistrict(user.district);
                setWard(user.ward);
                setStreet(user.street);
                setLongitude(user.longitude);
                setLatitude(user.latitude);
                setRole(user.role);
            }
        }
    }, [user, dispatch, userId, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                _id: userId,
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                username: username,
                password: password,
                avatar: avatar,
                thumb: thumb,
                province: province,
                district: district,
                ward: ward,
                street: street,
                longitude: longitude,
                latitude: latitude,
                role: role
            })
        );
    };

    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/users" className="btn btn-danger text-white">
                            Quay lại trang quản lý
                        </Link>
                        <h2 className="content-title">Chỉnh sửa người dùng</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Lưu
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {errorUpdate && (
                                        <Message variant="alert-danger">{errorUpdate}</Message>
                                    )}
                                    {loadingUpdate && <Loading />}
                                    {loading ? (
                                        <Loading />
                                    ) : error ? (
                                        <Message variant="alert-danger">{error}</Message>
                                    ) : (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="user_firstname" className="form-label">
                                                    Tên
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_firstname"
                                                    required
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_lastname" className="form-label">
                                                    Họ
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_lastname"
                                                    required
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_email" className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_phone" className="form-label">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_phone"
                                                    required
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_username" className="form-label">
                                                    Tài khoản
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_username"
                                                    required
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">Ảnh đại diện</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="URL Hình ảnh"
                                                    value={avatar}
                                                    required
                                                    onChange={(e) => setAvatar(e.target.value)}
                                                />
                                                <input className="form-control mt-3" type="file" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">Ảnh bìa</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="URL Hình ảnh"
                                                    value={thumb}
                                                    required
                                                    onChange={(e) => setThumb(e.target.value)}
                                                />
                                                <input className="form-control mt-3" type="file" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_province" className="form-label">
                                                    Tỉnh
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_province"
                                                    required
                                                    value={province}
                                                    onChange={(e) => setProvince(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_district" className="form-label">
                                                    Quận/Huyện/Thành phố
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_district"
                                                    required
                                                    value={district}
                                                    onChange={(e) => setDistrict(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_ward" className="form-label">
                                                    Xã/Phường/Thị trấn
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_ward"
                                                    required
                                                    value={ward}
                                                    onChange={(e) => setWard(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_street" className="form-label">
                                                    Đường
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_street"
                                                    required
                                                    value={street}
                                                    onChange={(e) => setStreet(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_longitude" className="form-label">
                                                    Kinh độ
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_longitude"
                                                    required
                                                    value={longitude}
                                                    onChange={(e) => setLongitude(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_latitude" className="form-label">
                                                    Vĩ độ
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="user_latitude"
                                                    required
                                                    value={latitude}
                                                    onChange={(e) => setLatitude(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="user_role" className="form-label">
                                                    Quyền người dùng
                                                </label>
                                                <select className="form-select"
                                                    onChange={(e) => setRole(e.target.value)}
                                                    value={role}
                                                    id="user_role">
                                                    <>
                                                        <option value='admin'>Quản trị viên</option>
                                                        <option value='owners'>Khách hàng</option>
                                                        <option value='guest'>Người dùng</option>
                                                    </>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditUserMain;
