import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, message } from 'antd';
import ProjectForm from './ProjectForm'
import { SetLoading } from '../../../redux/loaderSlice';
import { GetAllProjects } from '../../../apicalls/projects';
import { DeleteProject } from '../../../apicalls/projects'

function Projects() {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllProjects({ owner: user._id });
      if (response.success) {
        setProjects(response.data);
      } else {
        throw new Error(response.error)
      } dispatch(SetLoading(false))

    } catch (error) {
      message.error(error.message)
      dispatch(SetLoading(false))
    }
  }

  const onDelete = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteProject(id);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.error);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      // render: (text) => text.toUpperCase(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      // render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-4">
            <i class="ri-delete-bin-line"
              onClick={() => onDelete(record._id)}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedProject(record);
                setShow(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className='flex justify-end'>
        <Button type='default'
          onClick={() => {
            setSelectedProject(null)
            setShow(true)
          }
          }
        >Add Project</Button>
      </div>
      <Table columns={columns} dataSource={projects}></Table>
      {
        show && <ProjectForm show={show} setShow={setShow}
          reloadData={() => { }} project={selectedProject}
        ></ProjectForm>
      }
    </div >
  )
}

export default Projects
