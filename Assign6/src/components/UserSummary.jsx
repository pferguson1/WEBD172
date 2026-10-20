function UserSummary({ completedCount, totalCount }) {
  return (
    <p className="user-summary">
      {completedCount} of {totalCount} users marked complete
    </p>
  );
}

export default UserSummary;
