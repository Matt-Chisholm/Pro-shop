import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaPenSquare } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </td>
            <td>
              {user.isAdmin ? (
                <FaPenSquare style={{ color: "green" }} />
              ) : (
                <FaTrash style={{ color: "red" }} />
              )}
            </td>
            <td>
              <LinkContainer to={`/admin/user/${user._id}/edit`}>
                <Button variant='light' className='btn-sm'>
                  <FaPenSquare />
                </Button>
              </LinkContainer>
              <Button variant='danger' className='btn-sm'>
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserListScreen;
