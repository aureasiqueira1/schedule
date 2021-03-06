import React, { useEffect, useState } from "react";

import Board from "../../components/Board/Board";

import "./styles.css";
import Editable from "../../components/Editabled/Editable";
import api from "../../services/api";

function Trello() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  /////////// início teste com backend
  const [cart, setCart] = useState([])

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    const response = await api.get('/cartoes')
    console.log('response: ', response.data)
    setCart(response.data)
  }
  /////////// fim teste com backend


  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);



  //////// Criando componentes para as funcionalidades de cartão do backend
  const addCardHandlerCartao = (id, title) => {
    const index = cart.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...cart];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setCart(tempBoards)
  };

  const removeBoardCartao = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    if (index < 0) return;
    const tempBoards = [...cart];
    tempBoards.splice(index, 1);
    setCart(tempBoards)
  };

  const updateCardCartao = (bid, cid, card) => {
    const index = cart.findIndex((item) => item.id === bid);
    if (index < 0) return;
    const tempBoards = [...cart];
    const cards = tempBoards[index].cards;
    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;
    tempBoards[index].cards[cardIndex] = card;
    setBoards(tempBoards);
    setCart(tempBoards);
  };

  async function remove(id: any){
    await api.delete(`/cartoes/${id}`)
    loadTasks()
  }

  const dragEndedCartao = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = cart.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = cart[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = cart.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = cart[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...cart];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);
    setCart(tempBoards)

    setTargetCard({
      bid: "",
      cid: "",
    });
  };
  ///////// Fim
  return (
    <div className="app">

      <div className="app_boards_container">
        <div className="app_boards">

          {/* ---- Usando dados do backend
          {cart.map((item) => (
            <Board
            key={item.id}
            board={item}
            addCard={addCardHandlerCartao}
            removeBoard={() => removeBoardCartao(item.id)}
            removeCard={remove}
            dragEnded={dragEndedCartao}
            dragEntered={dragEntered}
            updateCard={updateCardCartao}
            />  
          ))}*/}
          
          
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
          <div className="app_boards_last">
            <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Digite o nome do cartão"
              text="+ Adicionar cartão"
              buttonText="Adicionar"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trello;
