import React from "react";
import { Input, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./App.css";

const { Search } = Input;

function App() {
  const [loading, setLoading] = React.useState(false)
  const inputRef = React.useRef(null);
  const sharedProps = {
    ref: inputRef,
  };

  const clear = () => {
    inputRef.current.focus({
      cursor: "start",
    });
    let inputbox = document.querySelector("#stdin");
    let displaybox = document.querySelector('.content-right');
    let displayboxtext = document.querySelector(".content-right-text");
    inputbox.value = "";
    displayboxtext.innerHTML = "";
    displaybox.style.display = "none";
  }


  const suffix = (
    <CloseOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
        cursor: "pointer",
      }}
      onClick={clear}
    />
  );


  const onSearch = async (value, e) => {
    e.preventDefault();
    setLoading(true);

    let displaybox = document.querySelector('.content-right')
    let displayboxtext = document.querySelector(".content-right-text");
    let formattedOutput;
    const response = await fetch("http://localhost:8080/api", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ post: value }),
     });
    const body = await response.text();
    formattedOutput = body.replace(/(?:\n)/g, "<br><hr>");
    displayboxtext.innerHTML = formattedOutput;
    displaybox.style.display = "flex"

    setLoading(false);
   };

  return (
    <div className="App">
      <div className="content-left">
        <h5 style={{ fontWeight: "600" }}>Search words in the works of</h5>
        <h1 style={{ lineHeight: "50px", fontWeight: "700" }}>
          Charles Dickens.
        </h1>
        <h5 style={{ fontWeight: "600" ,lineHeight: "10px",paddingBottom:'20px'}}>(enter comma separated words)</h5>
        <div>
          <Space direction="vertical">
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              type="text"
              id="stdin"
              suffix={suffix}
              onSearch={onSearch}
              loading={loading}
              {...sharedProps}
            />
          </Space>
        </div>
      </div>
      <div className="content-right">
        <Space>
          <p className="content-right-text"></p>
        </Space>
      </div>
    </div>
  );
}

export default App;
