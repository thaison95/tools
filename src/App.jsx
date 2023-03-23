import {useEffect, useState} from 'react';
import './App.css';

const memberLists = [
  'An', 'Nhựt', 'Quang', 'Hải', 'Thư', 'Bảo', 'Trung Dương', 'Trung Nguyễn', 'Khải', 'Thịnh', 'ME'
];

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fromStorage = localStorage.getItem('members');
    if (fromStorage) {
      setList(JSON.parse(fromStorage))
    } else {
      setList(memberLists.map((m) => ({ name: m, status: false })));
      localStorage.setItem('members', JSON.stringify(memberLists.map((m) => ({ name: m, status: false }))))
    }
  }, []);
  const onChangeStaus = (event, name) => {
    const copyList = [...list];
    const idxChangedMem = copyList.findIndex(mem => mem.name === name);
    copyList[idxChangedMem].status = event.target.checked;
    setList(copyList);
    localStorage.setItem('members', JSON.stringify(copyList));
  }
  return (
    <>
      {list.map((mem) => (
        <div className="form-control w-52" key={mem.name}>
          <label className="label cursor-pointer">
            <span className="label-text">{mem.name}</span>
            <input type="checkbox" onChange={(e,) => onChangeStaus(e, mem.name)} className="toggle" checked={mem.status} />
          </label>
        </div>
        ))}
      <div className="fixed right-2 top-2">
        {/* The button to open modal */}
        <label htmlFor="my-modal" className="btn btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Members</h3>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">Yay!</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
