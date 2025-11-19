import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const apiUrl = 'http://127.0.0.1:4000/api/jobs';
  const deleteJob = async () => {
    await fetch (`${apiUrl}/${id}`,{
      method:'Delete',
    });

    console.log('job deleted sucessfully');
  };

  

  //const apiUrl = 'http://127.0.0.1:4000/api/jobs';

  const fetchJobs = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`)
    const data = await response.json()
    console.log('Single Job', data)
    setJob(data)
  }

  useEffect(() => {
    fetchJobs(id)
  }, [job]);


  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Contact Phone: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted Date: {job.postedDate}</p>
      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={deleteJob}>Delete Job</button>
    </div>
  );
};

export default JobPage;
