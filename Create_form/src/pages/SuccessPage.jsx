import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Form Submitted Successfully!</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong> {value}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default SuccessPage;
