//package com.movie.movietheater.service.custom;
//
//import com.movie.movietheater.dto.response.FilmResponse;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import org.apache.logging.log4j.LogManager;
//import org.springframework.stereotype.Repository;
//
//import java.util.logging.Logger;
//
//@Repository
//public class CustomFilmRepository {
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    public List<FilmResponse> getEmployeeData(EmployeeReportRequest reportRequest, LocalDate startDate, LocalDate endDate) {
//        StringBuilder queryStr = new StringBuilder();
//
//        queryStr.append(" select e.id as id" +
//                "     , e.code as code" +
//                "     , e.full_name as fullName" +
//                "     , literacy.par_name as literacy" +
//                "     , gender.par_name as gender" +
//                "     , e.dob as birthDay" +
//                "     , d.department_full_name as department" +
//                "     , title.par_name as title" +
//                "     , position.par_name as position" +
//                "     , contract_type.par_name as contractType" +
//                "     , e.status as status");
//        queryStr.append(createQueryString(reportRequest, 0));
//        if (reportRequest.getSortField() != null) {
//            queryStr.append(" order by " + reportRequest.getSortField().replace(",", " "));
//        }
//        Query query = entityManager.createNativeQuery(queryStr.toString(), Tuple.class);
//
//        if (reportRequest.getDepartmentId() != null) {
//            query.setParameter("department", CommonUtils.getLikeCondition("/" + reportRequest.getDepartmentId() + "/"));
//        }
//        if (reportRequest.getTitleCode() != null) {
//            query.setParameter("title", reportRequest.getTitleCode());
//        }
//        if (reportRequest.getPositionCode() != null) {
//            query.setParameter("position", reportRequest.getPositionCode());
//        }
//        if (reportRequest.getContractType() != null) {
//            query.setParameter("contractType", reportRequest.getContractType());
//        }
//        if (reportRequest.getGender() != null) {
//            query.setParameter("gender", reportRequest.getGender());
//        }
//        if (reportRequest.getLiteracyRank() != null) {
//            query.setParameter("literacy", reportRequest.getLiteracyRank());
//        }
//        if (reportRequest.getStartDate() != null && reportRequest.getEndDate() != null) {
//            if (reportRequest.getDateType() == 1) {
//                query.setParameter("startDate0" , startDate.withDayOfMonth(1));
//                query.setParameter("endDate0" , endDate.plusMonths(1).withDayOfMonth(1).minusDays(1));
//            } else {
//                query.setParameter("startDate0" , startDate.withDayOfMonth(1));
//                query.setParameter("endDate0" , endDate.plusYears(1).withDayOfMonth(1).minusDays(1));
//            }
//        }
//        List<Tuple> tuples = query.getResultList();
//        return tuples.stream().map(e -> CommonUtils.castTupleToGivenType(e, EmployeeReportDTO.class)).collect(Collectors.toList());
//    }
//
//}
