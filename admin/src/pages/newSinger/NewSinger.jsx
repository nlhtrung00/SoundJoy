import "./newSinger.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Singer</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="Jazzy Dạ Lam" />
        </div>
        <div className="newUserItem">
          <label>Information</label>
          <input
            type="link"
            placeholder="https://vietnamjazz.wordpress.com/jazz-in-vietnam/vietnamese-jazz-artists/jazzy-da-lam/"
          />
        </div>
        <div className="newUserItem">
          <label>Followers</label>
          <input type="number" placeholder="700" />
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
