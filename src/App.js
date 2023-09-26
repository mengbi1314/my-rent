import React, { useState } from "react";

const App = () => {

  // 定义属性的初始值，数据类型，更新该属性的方法
  const [num, setNum] = useState(0);

  const ButtonStyle = {
    fontSize: '28px',
    width: '80px',
    height: '50px',
    background: 'pink'
  }

  const NumAdd = () => {
    setNum(num + 1);
  }

  const [UserList, setUserList] = React.useState([
    {
      id: 1,
      name: 'admin',
      age: 18
    },
    {
      id: 2,
      name: 'demo',
      age: 19
    },
    {
      id: 3,
      name: 'test',
      age: 30
    }
  ]);

  const onTable = (item, e) => {
    console.log(item)

    console.log(e.target.innerHTML)
  }

  return (
    <>
      {/* 添加class类，注意class属性改为className */}
      <div className='App'>App</div>
      {/* {{}} */}
      <div>{num}</div>
      {/* 行内样式 */}
      <div style={ButtonStyle} onClick={NumAdd}>demo</div>

      <Table list={UserList} onClick={onTable} />

      {50 * 2}

      {'1' + 1}

      {num > 10 ? '当前大于10' : '当前小于10'}
    </>
  )
};

const Table = (props) => {

  const list = props.list ?? [];

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名字</th>
            <th>年龄</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
                  <button onClick={(e) => props.onClick(item, e)}>编辑</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}


export default App;
