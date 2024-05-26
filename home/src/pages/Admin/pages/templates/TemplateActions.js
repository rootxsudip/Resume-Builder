import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios';

const TemplateActions = ({ params, rowId, setRowId, fetchTemplates }) => {
const { auth } = useAuth();

const handleEditClick = async () => {
    // console.log('Edit clicked for row id:', params.id);
    // console.log('Edit clicked for row id:', params.row.email);
    // console.log(auth.accessToken)

    try {
        const response = await axios.put(
          `http://localhost:8080/api/admin/templates/${params.row.id}`,
          {
            templateName : params.row.templateName,
            templateFormat: params.row.templateFormat,
            premium: params.row.premium 
        },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data); // Log response from the backend
        // Optionally, you can handle response data or update the UI
      } catch (error) {
        console.error('Error updating email:', error);
        // Optionally, you can handle errors and display a message to the user
      }
};

  const handleDelete = async () => {
    try {
        const response = await axios.delete(
          `http://localhost:8080/api/admin/templates/${params.row.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data); // Log response from the backend
        // Optionally, you can handle response data or update the UI
        fetchTemplates()
      } catch (error) {
        console.error('Error updating email:', error);
        // Optionally, you can handle errors and display a message to the user
      }
  };

  return (
    <>
      <IconButton onClick={handleEditClick} size="small">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete} size="small">
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default TemplateActions;
