const visits = [];

function insertVisit(visit) {
  visits.push(visit);
}

function listVisits() {
  return visits;
}

module.exports = { insertVisit, listVisits };
