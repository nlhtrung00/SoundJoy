import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">List of present</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Name</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Listeners</th>
          <th className="widgetLgTh">Category</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://th.bing.com/th/id/OIP.mHtdBgEje9N2ucTmdaIx0gHaHa?pid=ImgDet&w=400&h=400&rs=1"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">All too well</span>
          </td>
          <td className="widgetLgDate">10 March 2022</td>
          <td className="widgetLgAmount">19</td>
          <td className="widgetLgStatus">
            <Button type="Song" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://th.bing.com/th/id/R.cae08dd75af3169afec8452da8a43b89?rik=4A%2bS7q3nzYCWsA&pid=ImgRaw&r=0"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Rock music</span>
          </td>
          <td className="widgetLgDate">03 March 2022</td>
          <td className="widgetLgAmount">20</td>
          <td className="widgetLgStatus">
            <Button type="Genre" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://th.bing.com/th/id/R.6672968bef6fa180e3cad0b545a978a3?rik=41UYwN8b6ZM%2faA&pid=ImgRaw&r=0"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Red (Tailor's version)</span>
          </td>
          <td className="widgetLgDate">10 March 2022</td>
          <td className="widgetLgAmount">25</td>
          <td className="widgetLgStatus">
            <Button type="Album" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://townsquare.media/site/252/files/2021/10/attachment-adele-easy-on-me.jpg?w=1200&h=0&
              zc=1&s=0&a=t&q=89 "
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Easy on me</span>
          </td>
          <td className="widgetLgDate">20 March 2022</td>
          <td className="widgetLgAmount">15</td>
          <td className="widgetLgStatus">
            <Button type="Song" />
          </td>
        </tr>
      </table>
    </div>
  );
}
