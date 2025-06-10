
const DashBoardComponent = () => {
 
  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <h1>{JSON.parse(sessionStorage.getItem("infoUser"))?.fullName}</h1>
    </div>
  );
};

export default DashBoardComponent;
