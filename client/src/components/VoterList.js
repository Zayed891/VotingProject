import { useState, useEffect } from "react";
function VoterList({ state }) {
  const [voterlist, setvoterList] = useState([]);
  useEffect(() => {
    const { contract } = state;
    async function listDisplay() {
      const voterlist = await contract.methods.voterList().call();
       /* console.log(voterlist); */
      setvoterList(voterlist);
    }
    contract && listDisplay();
  }, [state]);

  return (
    <>
      <table>
        <tbody>
          {voterlist.map((voter) => {
            return (
              <tr>
                <td>{voter.voterId}</td>
                <td>{voter.name}</td>
                <td>{voter.voteCandidateId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      ;
    </>
  );
}
export default VoterList;
