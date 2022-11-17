export const NavigateTo = async (destination: string, history: any) => {
  history.push(destination);
  window.location.reload();
};
