import { useState,useEffect } from "react";

function Vote({ state, account }) {
  const[status,setStatus] = useState("Not declared");
  async function voting(event) {
    event.preventDefault();
    const { contract } = state;

    const voterId = document.querySelector("#voterId").value;
    const candidateId = document.querySelector("#candidateId").value;

    try {
      await contract.methods
        .vote(voterId, candidateId)
        .send({ from: account, gas: "1000000" });

      alert("Voting is successful");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  useEffect(()=>{
    const {contract} = state;
    async function voteStatus(){
      const status = await contract.methods.votingStatus().call();
      setStatus(status);

    }
    contract && voteStatus();
  },[state])

  return (
    <div>
      <form className="form" onSubmit={voting}>
        <p className="status">Voting Status : {status}</p>
        <label className="label2" htmlFor="voterId">
          VoterId:
        </label>
        <input className="innerBoxVote" type="text" id="voterId"></input>

        <label className="label2" htmlFor="candidateId">
          Candidate Id:
        </label>
        <input className="innerBoxVote" type="text" id="candidateId"></input>
        <button className="regBtn" type="submit">
          Vote
        </button>
      </form>
    </div>
  );
}
export default Vote;
