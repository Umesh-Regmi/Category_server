export const get_pagination = (
  total_documents,
  total_pages,
  current_page,
  limit
) => {
  total_pages: Math.ceil(total_documents / limit);
  return {
    page: current_page,
    previous_page: total_pages > 1 ? current_page - 1 : null,
    next_page: total_pages > current_page ? current_page + 1 : null,
    has_previous_page: total_pages > 1 ? true : false,
    has_next_apge: total_pages > current_page ? true : false,
    total: total_documents,
  };
};
