import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import CategoryItem from "./CategoryItem";

const CategoriesTable = () => {
  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.categoriesList);
  const { loading, error, categories } = categoriesList;

  const categoriesDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoriesDelete;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { category } = categoryCreate;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch, category, successDelete]);
  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>ID</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th className="text-end">Hành động</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {loading ? (
            <div className="mb-5">
              <Loading />
            </div>
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : categories ? (
            <>
              {categories.map((category) => (
                <tr>
                  <CategoryItem
                    id={category._id}
                    categoryName={category.name}
                    description={category.description}
                  />
                </tr>
              ))}
            </>
          ) : (
            <Message variant="alert-danger">
              Đã xảy ra lỗi, vui lòng làm mới trang
            </Message>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
